using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateAnnouncementDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
    }
}