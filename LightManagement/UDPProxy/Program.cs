﻿using System;
using UDPProxy;

namespace UDPProxy
{
    class Program
    {
        static void Main(string[] args)
        {
            Proxy proxy = new Proxy(7147);
            proxy.start();
            
        }
    }
}
