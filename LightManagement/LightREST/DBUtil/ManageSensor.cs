using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ModelLibrary;

namespace LightREST.DBUtil
{
    public class ManageSensor
    {
        private string connectionString =
              @"Server=tcp:ande651p-easj-newdbserver.database.windows.net,1433;Initial Catalog=ande651p-easj-DB;Persist Security Info=False;User ID=asn230791;Password=LMSprojekt3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        /// <summary>
        /// SQL streng til at hente alle rækker i LMSSensor tabellen fra databasen
        /// </summary>
        private String queryString = "select * from LMSSensor";

        /// <summary>
        /// SQL Streng til at hente en bestemt bruger ud fra angivet Id
        /// </summary>
        private String queryStringFromID = "select * from LMSSensor where Id = @Id";

        /// <summary>
        /// SQL til til at indsætte et Bruger objekt som række i LMSSensor Tabellen i databasen
        /// </summary>
        private String insertSql = "insert into LMSSensor Values (@Id, @IsMoving, @Sensitivity)"; //skal rettes til sensor!

        /// <summary>
        /// SQL streng til at opdatere værdierne for en række i LMSSensor Tabellen i Databasen ud fra angivet Id, samt værdier der skal opdateres
        /// </summary>
        private String updateSql = "update LMSSensor " +
                                   "set Id = @Id, IsMoving = @IsMoving, Sensitivity = @Sensitivity " + //Skal rettes til sensor!
                                   "where Id = @OriginId";

        /// <summary>
        /// SQL streng til at slette en række fra LMSSensor babellen i databasen ud fra angivet Id
        /// </summary>
        private String deleteSql = "delete from LMSSensor where Id = @Id";

        public List<Sensor> HentAlleSensor()
        {
            List<Sensor> Sensorer = new List<Sensor>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Sensorer.Add(ReadSensor(reader));
                }
            }
            return Sensorer;
        }

        public Sensor HentEnSensor(int sensorId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryStringFromID, connection);
                command.Parameters.AddWithValue("@Id", sensorId);

                command.Connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    return ReadSensor(reader);
                }
            }
            return null;
        }

        public bool TilføjSensor(Sensor sensor)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertSql, connection);

                TilføjVærdiSensor(sensor, command);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return true;
                }
                return false;
            }
        }

        public bool OpdaterSensor(int sensorId, Sensor sensor)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateSql, connection);

                TilføjVærdiSensor(sensor, command);
                command.Parameters.AddWithValue("@OriginId", sensorId);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return true;
                }
                return false;
            }
        }

        public Sensor FjernSensor(int sensorID)
        {
            Sensor opgave = HentEnSensor(sensorID);
            if (opgave == null)
            {
                return null;
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(deleteSql, connection);
                command.Parameters.AddWithValue("@Id", sensorID);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return opgave;
                }
                return null;
            }
        }

        private Sensor ReadSensor(SqlDataReader reader)
        {
            int id = reader.GetInt32(0);
            string isMoving = reader.GetString(1);
            bool m = Boolean.TryParse(isMoving, out m);
            double sensitivity = reader.GetDouble(2);
            
            return new Sensor(id, m, sensitivity);
        }

        private void TilføjVærdiSensor(Sensor sensor, SqlCommand command)
        {
          command.Parameters.AddWithValue("@Id", sensor.Id);
          command.Parameters.AddWithValue("@IsMoving", sensor.IsMoving.ToString());
          command.Parameters.AddWithValue("@Sensitivity", sensor.Sensitivity);
        }
    }
}

