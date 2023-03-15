using Base62;
using System.Security.Cryptography;
using System.Text;

namespace InforceTestTask
{
    public class ShortenURL
    {
        public static string Algorithm(string? URL)        {
            MD5 md5 = MD5.Create();
            return md5.ComputeHash(Encoding.UTF8.GetBytes(URL)).ToBase62();
        }
    }
}
