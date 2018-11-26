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
        /// <summary>
        /// SQL streng til at hente alle rækker i RisoeOpgave tabellen fra databasen
        /// </summary>
        private String queryString = "select * from LMSBruger";
        
        /// <summary>
        /// SQL Streng til at hente et bestemt udstyr ud fra angivet udstyrsID
        /// </summary>
        private String queryStringFromID = "select * from LMSBruger where Id = @Id";

        /// <summary>
        /// SQL til til at indsætte et Opgave Object som række i RisoeOpgave Tabellen i Databasen
        /// </summary>
        private String insertSql = "insert into LMSBruger Values (@Brugernavn @Kodeord)";

        /// <summary>
        /// SQL streng til at slette en række fra RisoeOpgave Tabellen i Databasen ud fra angivet OpgaveID
        /// </summary>
        private String deleteSql = "delete from LMSBruger where Id = @Id";

        public List<Bruger> HentAlleBruger()
        {
            List<Bruger> opgaver = new List<Bruger>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    //OBS! Udkommenteret kode nedenfor står som eksempel på brud med DRY-princippet. Se rapport

                    //int id = reader.GetInt32(0);
                    //String beskrivelse = reader.GetString(1);
                    //String statusStr = reader.GetString(2);
                    //StatusType status = (StatusType)Enum.Parse(typeof(StatusType), statusStr);
                    //checkEnumParse(status,id);
                    //int ventetid = reader.GetInt32(3);

                    //opgaver.Add(new Opgave(id, beskrivelse, status, ventetid));

                    //Brug af ReadOpgave metode (DRY)
                    opgaver.Add(ReadOpgave(reader));
                }
            }
            return opgaver;
        }
    }
}
