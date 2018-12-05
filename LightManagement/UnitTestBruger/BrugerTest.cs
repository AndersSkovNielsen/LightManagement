using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ModelLibrary;
using LightREST;
using LightREST.DBUtil;

namespace UnitTestBruger
{
    [TestClass]
    public class BrugerTest
    {
        [TestMethod]
        public void TestListeLængde()
        {
            List<Bruger> liste = new List<Bruger>();
            ManageBruger manager = new ManageBruger();
            int firstCount = 0;
            int secondCount = 0;

            liste = manager.HentAlleBruger();

            firstCount = liste.Count;

            manager.FjernBruger(1);

            liste = manager.HentAlleBruger();

            secondCount = liste.Count;

            Assert.AreNotEqual(firstCount, secondCount);
        }
    }
}
