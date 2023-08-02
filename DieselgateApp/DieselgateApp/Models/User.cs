using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DieselgateApp.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }
        public virtual List<Claim> Claims { get; set; }

        public User()
        {
            Claims = new List<Claim>();
        }
    }
}
