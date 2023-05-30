// import signalR from '@microsoft/signalr'
//
// export default function(context) {
//
//   const connection = new signalR.HubConnectionBuilder()
//     .withUrl("industryprojectsignalr.service.signalr.net")
//     .configureLogging(signalR.LogLevel.Information)
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
export default () => {

}