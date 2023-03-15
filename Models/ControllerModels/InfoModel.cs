using System.ComponentModel.DataAnnotations.Schema;

namespace InforceTestTask.Models.ControllerModels
{
    [NotMapped]
    public class InfoModel
    {
        public int URLid { get; set; }
        public string? LongURL { get; set; }
        public string? ShortURL { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }
        public string? UserLogin { get; set; }
        public string? UserPassword { get; set;}
    }
}
