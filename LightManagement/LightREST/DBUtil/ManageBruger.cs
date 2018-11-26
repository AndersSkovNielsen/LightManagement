using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ModelLibrary;

namespace LightREST.DBUtil
{
    public class ManageBruger
    {
        private string connectionString =
            @"";

        /// <summary>
        /// SQL streng til at hente alle rækker i LMSBruger tabellen fra databasen
        /// </summary>
        private String queryString = "select * from LMSBruger";
        
        /// <summary>
        /// SQL Streng til at hente en bestemt bruger ud fra angivet Id
        /// </summary>
        private String queryStringFromID = "select * from LMSBruger where Id = @Id";

        /// <summary>
        /// SQL til til at indsætte et Bruger objekt som række i LMSBruger Tabellen i databasen
        /// </summary>
        private String insertSql = "insert into LMSBruger Values (@Brugernavn, @Kodeord)";

        /// <summary>
        /// SQL streng til at slette en række fra LMSBruger babellen i databasen ud fra angivet Id
        /// </summary>
        private String deleteSql = "delete from LMSBruger where Id = @Id";

        public List<Bruger> HentAlleBruger()
        {
            List<Bruger> brugere = new List<Bruger>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    brugere.Add(ReadBruger(reader));
                }
            }
            return brugere;
        }

        public Bruger HentBrugerFraId(int brugerId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryStringFromID, connection);
                command.Parameters.AddWithValue("@Id", brugerId);

                command.Connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    return ReadBruger(reader);
                }
            }
            return null;
        }

        public bool IndsætBruger(Bruger bruger)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertSql, connection);
                
                TilføjVærdiBruger(bruger, command);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return true;
                }
                return false;
            }
        }

        public Bruger FjernBruger(int brugerID)
        {
            Bruger opgave = HentBrugerFraId(brugerID);
            if (opgave == null)
            {
                return null;
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(deleteSql, connection);
                command.Parameters.AddWithValue("@Id", brugerID);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return opgave;
                }
                return null;
            }
        }

        private Bruger ReadBruger(SqlDataReader reader)
        {
            int id = reader.GetInt32(0);
            String brugernavn = reader.GetString(1);
            String kodeord = reader.GetString(2);
            
            return new Bruger(id, brugernavn, kodeord);
        }

        private void TilføjVærdiBruger(Bruger bruger, SqlCommand command)
        {
            command.Parameters.AddWithValue("@Brugernavn", bruger.Brugernavn);
            command.Parameters.AddWithValue("@Kodeord", bruger.Kodeord);
        }
    }
}
