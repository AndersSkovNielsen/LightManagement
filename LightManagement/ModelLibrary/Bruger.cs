using System;
using System.Collections.Generic;
using System.Text;

namespace ModelLibrary
{
    public class Bruger
    {
        private int _id;
        private string _brugernavn;
        private string _kodeord;
        private Sensor _sensor;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        public string Brugernavn
        {
            get { return _brugernavn; }
            set { _brugernavn = value; }
        }
        public string Kodeord
        {
            get { return _kodeord; }
            set { _kodeord = value; }
        }

        public Sensor Sensor
        {
            get { return _sensor; }
            set { _sensor = value; }
        }

        public Bruger()
        {}

        public Bruger(string brugernavn, string kodeord)
        {
            _brugernavn = brugernavn;
            _kodeord = kodeord;
        }

        public Bruger(int id, string brugernavn, string kodeord)
        {
            _id = id;
            _brugernavn = brugernavn;
            _kodeord = kodeord;
        }

        public Bruger(int id, string brugernavn, string kodeord, Sensor sensor)
        {
            _id = id;
            _brugernavn = brugernavn;
            _kodeord = kodeord;
            _sensor = sensor;
        }
    }
}
