using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TenantDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string BusinessName { get; set; } = default!;
        public string Address { get; set; } = default!;
        public DateTimeOffset DateCreated { get; set; }
        public SlotContractDto? Contract { get; set; }
        public string TenantUniqueId { get; set; }
        public bool IsActive { get; set; }
    }
}