using System;
using System.Collections.Generic;
using System.Text;

namespace ModelLibrary
{
    public class Bruger
    {
        private int _id;
        private string _brugernavn;
        private string _password;

        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }
        public string BrugerNavn
        {
            get { return _brugernavn; }
            set { _brugernavn = value; }
        }
        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }
        public Bruger()
        { }
        public Bruger(int id, string brugerNavn, string password)
        {
            _id = id;
            _brugernavn = brugerNavn;
            _password = password;
        }
    }
}
