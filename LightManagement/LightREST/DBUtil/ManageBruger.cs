﻿using System;
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
        private String insertSql = "insert into LMSBruger Values (@Id, @Brugernavn, @Kodeord)";

        /// <summary>
        /// SQL streng til at opdatere værdierne for en række i LMSBruger Tabellen i Databasen ud fra angivet Id, samt værdier der skal opdateres
        /// </summary>
        private String updateSql = "update LMSBruger " +
                                   "set Id = @Id, Brugernavn = @Brugernavn, Kodeord = @Kodeord " +
                                   "where Id = @Id";

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

        public Bruger HentEnBruger(int brugerId)
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

        public bool TilføjBruger(Bruger bruger)
        {
            if (TilladMetode(bruger.Id) == true)
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

            return false;
        }

        public bool OpdaterBruger(int brugerId, Bruger bruger)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateSql, connection);
                
                TilføjVærdiBruger(bruger, command);
                command.Parameters.AddWithValue("@Id", brugerId);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return true;
                }
                return false;
            }
        }

        public bool FjernBruger(int brugerID)
        {
            Bruger b = HentEnBruger(brugerID);
            if (b == null)
            {
                return false;
            }
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(deleteSql, connection);
                command.Parameters.AddWithValue("@Id", brugerID);

                command.Connection.Open();

                int noOfRows = command.ExecuteNonQuery();

                if (noOfRows == 1)
                {
                    return true;
                }

                return false;
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
            command.Parameters.AddWithValue("@Id", bruger.Id);
            command.Parameters.AddWithValue("@Brugernavn", bruger.Brugernavn);
            command.Parameters.AddWithValue("@Kodeord", bruger.Kodeord);
        }

        private bool TilladMetode(int id)
        {
            Bruger b = HentEnBruger(id);

            if (b == null)
            {
                return true;
            }

            return false;
        }
    }
}
