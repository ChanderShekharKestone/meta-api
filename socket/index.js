const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const actionTypes = require("./types");
const rootSocket = (server) => {
  const io = socket(server, {
    cors: {
      // origin: "http://localhost:3000",
      origin: ["http://localhost:3000", "http://localhost:3001"],
    },
  });
  let users = [];
  const addUser = (user, socketId) => {
    !users.some((item) => item._id === user._id) &&
      users.push({ user, socketId });
  };
  const removeUser = (socketId) => {
    users = users.filter((item) => item.socketId !== socketId);
  };
  const findUser = async (userId) => {
    const ff = await users.find((user) => user.user._id === userId);
    return ff?.socketId;
  };

  io.use(function (socket, next) {
    console.log("I Love you");
    // console.log(socket.handshake.query.token);
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.TOKEN_SECRET,
        function (err, decoded) {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    socket.on("action", (action) => {
      switch (action.type) {
        case "SOCKET/ADD_USER": {
          console.log(action);
          addUser(action.payload, socket.id);
          io.emit("action", {
            type: "SOCKET/ALL_USER",
            payload: users,
          });
          break;
        }
        case "SOCKET/JOIN_ROOM": {
          const users = action?.payload.split("_");
          users.map((user) => {
            findUser(user).then((res) => {
              io.sockets?.sockets?.get(res)?.join(action.payload);
            });
          });
          break;
        }
        case "SOCKET/SEND_MESSAGE": {
          const ff = action.payload.receiver._id;
          findUser(ff).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/RECEIVED_MESSAGE",
              payload: action.payload,
            });
          });
          break;
        }
        case "SOCKET/DELETE_MESSAGE": {
          findUser(action.payload.receiverId).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/DELETE_MESSAGE_UPDATE",
              payload: action.payload,
            });
          });
          break;
        }
        case "SOCKET/CALL_USER": {
          action.payload.isReceivingCall = true;
          findUser(action.payload.oppUser._id).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/CALLING_SOMEONE",
              payload: action.payload,
            });
          });
          break;
        }
        case "SOCKET/CALL_REJECT": {
          findUser(action.payload.oppUsar._id).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/CALL_REJECTED",
              payload: action.payload,
            });
          });
          break;
        }
        case "SOCKET/CALL_ACCEPT": {
          findUser(action.payload.oppUsar._id).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/CALL_ACCEPTED",
              payload: action.payload,
            });
          });
          break;
        }

        case "SOCKET/CALL_END": {
          findUser(action.payload.oppUsar._id).then((res) => {
            socket.to(res).emit("action", {
              type: "SOCKET/CALL_ENDED",
              payload: action.payload,
            });
          });
          break;
        }

        default:
          break;
      }
    });

    socket.on("disconnect", function () {
      console.log("user disconnected", socket.id);
      removeUser(socket.id);
      io.emit("action", { type: "SOCKET/GETUSER", payload: users });
    });
  });
};
module.exports = rootSocket;
