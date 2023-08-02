using System;

namespace DieselgateApp.Models
{
    public class Claim
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } 
        public string ClaimDetails { get; set; }
        public string ClaimStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
