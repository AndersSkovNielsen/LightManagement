using System.Collections.Generic;
using System.Net.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ModelLibrary;
using LightREST;
using LightREST.DBUtil;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System;

namespace UnitTestBruger
{
    [TestClass]
    public class BrugerTest
    {
        [TestMethod]
        public void TestListeLængde()
        {
            string uri = "http://ande-easj-rest.azurewebsites.net/api/sensor/";
            List<Bruger> liste = new List<Bruger>();
            ManageBruger manager = new ManageBruger();
            int firstCount = 0;
            int secondCount = 0;
            Bruger b = new Bruger(1, "ansn", "kodeord");

            using (HttpClient client = new HttpClient())
            {
                liste = JsonConvert.DeserializeObject<List<Bruger>>(client.GetStringAsync(uri).Result);

                firstCount = liste.Count;

                client.DeleteAsync(uri + 1);

                liste = JsonConvert.DeserializeObject<List<Bruger>>(client.GetStringAsync(uri).Result);

                secondCount = liste.Count;

                Assert.AreNotEqual(firstCount, secondCount);

                String json = JsonConvert.SerializeObject(b);
                StringContent content = new StringContent(json);
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                client.PostAsync(uri, content);
            }
        }
    }
}
