using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace UDPProxy
{
    public class Proxy
    {
        private readonly int PORT;

        //public UDPReceiver(int port)
        //{
        //    PORT = port;
        //}

        public void start()
        {
            IPEndPoint remoteEP = new IPEndPoint(IPAddress.Any, 0);

            using (UdpClient receiverSock = new UdpClient(10100)) // Raspberry port nummer her
            {
                while (true)
                {
                    HandleOneRequest(receiverSock, remoteEP);
                }
            }
        }
        private static void HandleOneRequest(UdpClient receiverSock, IPEndPoint remoteEP)
        {
            byte[] data = receiverSock.Receive(ref remoteEP);
            String inStr = Encoding.ASCII.GetString(data);

            Console.WriteLine("modtaget " + inStr);
            Console.WriteLine("sender ip=" + remoteEP.Address + " port=" + remoteEP.Port);

            byte[] outData = Encoding.ASCII.GetBytes(inStr.ToUpper());
            receiverSock.Send(outData, outData.Length, remoteEP);
        }
    }
}
