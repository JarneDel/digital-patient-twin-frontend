// import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr'
//
// export default function(context) {
//   if (process.server) return
//
//   const connection = new HubConnectionBuilder()
//     .withUrl("https://industryprojectsignalr.service.signalr.net/client/?hub=newDeviceData",
//       {
//         skipNegotiation: true,
//         transport: HttpTransportType.WebSockets,
//         accessTokenFactory() {
//           return token
//         }
//       })
//     .configureLogging(LogLevel.Information)
//     .build();
//   console.log({connection})
//   async function start() {
//     try {
//       await connection.start();
//       console.log("SignalR Connected.");
//     } catch (err) {
//       console.log(err);
//       setTimeout(start, 5000);
//     }
//   }
//
//   connection.onclose(async () => {
//     await start();
//   });
//
// // Start the connection.
//   start();
//
//   context.SignalR = connection
// }


export default defineNuxtPlugin((context, inject) => {

})