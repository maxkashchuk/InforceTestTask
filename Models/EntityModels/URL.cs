using System.ComponentModel.DataAnnotations.Schema;

namespace InforceTestTask.Models.EntityModels
{
    public class URL
    {
        public URL()
        {
            this.Date = DateTime.Now;
        }
        public int Id { get; set; }
        public string? ShortUrl { get; set; }
        public string? LongUrl { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }
        public User? user { get; set; }
    }
}
