using System;

namespace ModelLibrary
{
    public class Sensor
    {
        private int _id;
        private bool _isMoving;
        private double _sensitivity;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public bool IsMoving
        {
            get { return _isMoving; }
            set { _isMoving = value; }
        }

        public double Sensitivity
        {
            get { return _sensitivity; }
            set { _sensitivity = value; }
        }

        public Sensor()
        {
        }

        public Sensor(int id, bool isMoving)
        {
            _id = id;
            _isMoving = isMoving;
        }

        public Sensor(int id, double sensitivity)
        {
            _id = id;
            _sensitivity = sensitivity;
        }

        public Sensor(int id, bool isMoving, double sensitivity)
        {
            _id = id;
            _isMoving = isMoving;
            _sensitivity = sensitivity;
        }

        public override string ToString()
        {
            return $"ID: {Id} - Sensitivity: {Sensitivity}";
        }
    }
}
