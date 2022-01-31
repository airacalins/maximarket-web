using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TenantContractImagesDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; } = default!;
        public DateTimeOffset DateCreated { get; set; }
    }
}