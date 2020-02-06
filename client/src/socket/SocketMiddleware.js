import mqtt from "mqtt";
import * as actiontypes from "../store/Actions/actionTypes";
import {
  ws_onMessage,
  ws_connected,
  ws_disconnected,
  ws_onMessageProduction
} from "../store/Actions";

const SocketMiddleware = store => {
  let mqttSocket = null;
  return next => action => {
    switch (action.type) {
      case actiontypes.MQTT_CONNECT:
        if (mqttSocket !== null) {
          mqttSocket.unsubscribe(
            [
              "/REALTIME/NEWLINE/PARSER/STATUS/#",
              "/REALTIME/NEWLINE/PARSER/PRODUCTION/#"
            ],
            err => {
              console.log(err);
            }
          );
          mqttSocket.end(true);
          store.dispatch(ws_disconnected());
        }

        // Connect to MQTT BROKER VIA WEBSOCKET
        mqttSocket = mqtt.connect("mqtt://172.16.76.55:9001");

        store.dispatch(ws_connected());

        break;
      case actiontypes.MQTT_DISCONNECT:
        if (mqttSocket !== null) {
          mqttSocket.unsubscribe(
            [
              "/REALTIME/NEWLINE/PARSER/STATUS/#",
              "/REALTIME/NEWLINE/PARSER/PRODUCTION/#"
            ],
            err => {
              console.log(err);
            }
          );
          mqttSocket.end(true);
          store.dispatch(ws_disconnected());
        }
        mqttSocket = null;
        break;
      case actiontypes.MQTT_ONSTATUS:
        if (store.getState().MQTT.connected) {
          try {
            mqttSocket.on("connect", () => {
              console.log("Connected MQTT");
              mqttSocket.subscribe("/REALTIME/NEWLINE/PARSER/STATUS/#");
            });
            mqttSocket.on("message", (topic, message) => {
              store.dispatch(ws_onMessage(JSON.parse(message.toString())));
            });
          } catch (err) {
            console.log(err);
            throw err;
          }
        }
        break;
      case actiontypes.MQTT_ONPRODUCTION:
        if (store.getState().MQTT.connected) {
          try {
            mqttSocket.on("connect", () => {
              console.log("Connected MQTT");
              mqttSocket.subscribe("/REALTIME/NEWLINE/PARSER/PRODUCTION/#");
            });
            mqttSocket.on("message", (topic, message) => {
              store.dispatch(
                ws_onMessageProduction(JSON.parse(message.toString()))
              );
            });
          } catch (err) {
            console.log(err);
            throw err;
          }
        }
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default SocketMiddleware;
