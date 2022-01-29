import { SemanticCOLORS } from "semantic-ui-react";
import { PaymentStatus } from "../models/invoice";
import { SlotStatus } from "../models/slot";

export const getSlotStatusText = (slotStatus: SlotStatus) => {
  switch (slotStatus) {
    case SlotStatus.Available: return "Available";
    case SlotStatus.Rented: return "Rented";
    case SlotStatus.UnderMaintenance: return "Under Maintenance";
    case SlotStatus.Reserved: return "Reserved";
    case SlotStatus.Archived: return "Archived";
    default: return "NA";
  }
}

export const getSlotStatusColor = (slotStatus: SlotStatus) => {
  switch (slotStatus) {
    case SlotStatus.Available: return "green" as SemanticCOLORS;
    case SlotStatus.Rented: return "blue" as SemanticCOLORS;
    case SlotStatus.UnderMaintenance: return "yellow" as SemanticCOLORS;
    case SlotStatus.Reserved: return "orange" as SemanticCOLORS;
    case SlotStatus.Archived: return "grey" as SemanticCOLORS;
    default: return "green" as SemanticCOLORS;
  }
}

export const getPaymentStatusText = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.Unpaid: return "Unpaid";
    case PaymentStatus.Pending: return "Pending";
    case PaymentStatus.Approved: return "Approved";
    case PaymentStatus.Declined: return "Declined";
    default: return "NA";
  }
}

export const getPaymentStatusColor = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.Unpaid: return "orange";
    case PaymentStatus.Pending: return "yellow";
    case PaymentStatus.Approved: return "blue";
    case PaymentStatus.Declined: return "red";
    default: return "red";
  }
}