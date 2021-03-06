﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Sockets;
using System.Text;
using ModelLibrary;
using Newtonsoft.Json;

namespace UDPProxy
{
    public class Proxy
    {
        private readonly int PORT;
        private static string Uri = "http://ande-easj-rest.azurewebsites.net/api/sensor/";

        public Proxy(int port)
        {
            PORT = port;
        }

        public void start()
        {
            IPEndPoint remoteEP = new IPEndPoint(IPAddress.Any, 7147);

            using (UdpClient receiverSock = new UdpClient(PORT)) // Raspberry port nummer her
            {
                while (true)
                {
                    HandleOneRequest(receiverSock, remoteEP);
                }
            }
            //using (UdpClient senderSock = new UdpClient()) // ingen port = lytter IKKE
            //{
            //    senderSock.EnableBroadcast = true;

            //    senderSock.Send(data, data.Length, receiverEP);

            //    IPEndPoint FromReceiverEP = new IPEndPoint(IPAddress.Any, 0);
            //    byte[] inData = senderSock.Receive(ref FromReceiverEP);

            //    String inStr = Encoding.ASCII.GetString(inData);

            //    Console.WriteLine("Modtaget = " + inStr);

            //}

        }
        private static void HandleOneRequest(UdpClient receiverSock, IPEndPoint remoteEP)
        {
            byte[] data = receiverSock.Receive(ref remoteEP);
            String inStr = Encoding.ASCII.GetString(data);

            Console.WriteLine(inStr);

            if (inStr.StartsWith("Sensitivity"))
            {
                string[] splitString = inStr.Split(" ");
                int sensorID = int.Parse(splitString[5]);
                double senseValue = double.Parse(splitString[2]);
                ValueToRest(sensorID, senseValue);
            }
            else if (inStr.StartsWith("Movement!"))
            {
                string[] splitString = inStr.Split(" ");
                int sensorID = int.Parse(splitString[2]);
                bool moving = true;
                ValueToRest(sensorID, moving);
            }

            //Console.WriteLine("sender ip=" + remoteEP.Address + " port=" + remoteEP.Port);

            //byte[] outData = Encoding.ASCII.GetBytes(inStr.ToUpper());
            //receiverSock.Send(outData, outData.Length, remoteEP);
        }

        private static bool ValueToRest(int id, double value)
        {
            Sensor opdaterSensor = new Sensor(id, value);

            String json = JsonConvert.SerializeObject(opdaterSensor);
            StringContent content = new StringContent(json);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage resultMessage = client.PutAsync(Uri + id, content).Result;

                if (resultMessage.IsSuccessStatusCode)
                {
                    string resultStr = resultMessage.Content.ReadAsStringAsync().Result;
                    bool res = JsonConvert.DeserializeObject<bool>(resultStr);
                    return res;
                }
            }

            return false;
        }

        private static bool ValueToRest(int id, bool value)
        {
            Sensor opdaterSensor = new Sensor(id, value);

            String json = JsonConvert.SerializeObject(opdaterSensor);
            StringContent content = new StringContent(json);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage resultMessage = client.PutAsync(Uri + id, content).Result;

                if (resultMessage.IsSuccessStatusCode)
                {
                    string resultStr = resultMessage.Content.ReadAsStringAsync().Result;
                    bool res = JsonConvert.DeserializeObject<bool>(resultStr);
                    return res;
                }
            }

            return false;
        }
    }
}
