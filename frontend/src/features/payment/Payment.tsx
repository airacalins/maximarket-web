import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import history from '../../app/utils/history';
import moment from "moment";

import { Label, Select } from "semantic-ui-react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { getInvoiceStatusColor, getInvoiceStatusText, getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";

import CustomTable from "../../app/layouts/components/table/CustomTable";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import { IInvoice, InvoiceStatus, PaymentStatus } from "../../app/models/invoice";
import { useParams } from "react-router-dom";
import { fetchInvoicesAsync } from "./invoiceSlice";

const Payment = () => {
  const { filter } = useParams<{ filter: string }>()
  const [searchKey, setSearchKey] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | undefined>(undefined);
  const { invoices, isFetching: isFetchingPayments } = useAppSelecter(state => state.invoice);
  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    let result = invoices;
    if (!!searchKey) {
      result = result.filter(i =>
        i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()) ||
        i.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
        i.lastName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if(selectedStatus != undefined || selectedStatus != null) {
      result = result.filter(i => i.invoiceStatus === selectedStatus);
    }

    return result;
  }, [invoices, searchKey, selectedStatus])

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [])

  useEffect(() => {
    switch (filter) {
      case "pending":
        setSelectedStatus(InvoiceStatus.Pending)
        break;
      case "unpaid":
        setSelectedStatus(InvoiceStatus.Unpaid);
        break
      case "paid":
        setSelectedStatus(InvoiceStatus.Paid);
        break;
      case "partiallypaid":
        setSelectedStatus(InvoiceStatus.PartiallyPaid);
        break;
      default:
        setSelectedStatus(undefined);
    }
  }, [filter])

  const status = (invoice: IInvoice) => <Label content={getInvoiceStatusText(invoice.invoiceStatus)} color={getInvoiceStatusColor(invoice.invoiceStatus)} />

  const columns = [
    { title: 'Invoice no.' },
    { title: 'Tenant' },
    { title: 'Slot Number' },
    { title: 'Rental Fee' },
    { title: 'Due Date' },
    { title: 'Status' },
    { title: '' },
  ]

  const paymentStatusOptions = [
    { text: "All", value: undefined },
    { text: getPaymentStatusText(PaymentStatus.Unpaid), value: PaymentStatus.Unpaid },
    { text: getPaymentStatusText(PaymentStatus.Pending), value: PaymentStatus.Pending },
    { text: getPaymentStatusText(PaymentStatus.Approved), value: PaymentStatus.Approved },
    { text: getPaymentStatusText(PaymentStatus.Declined), value: PaymentStatus.Declined },

  ]

  if (isFetchingPayments) return <LoadingComponent content="Loading invoices..." />

  return (
    <MainPage
      title="Invoices"
      content={
        <CustomTable
          searchValue={searchKey}
          onSearch={(value: string) => setSearchKey(value)}
          columns={columns}
          tableControls={
            <Select
              options={paymentStatusOptions}
              value={selectedStatus}
              onChange={(e, d) => setSelectedStatus(d.value as any)}
              name="paymentStatus"
              placeholder="Invoice Status"
            />
          }
          rows={
            !data.length ?
              [
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    No data
                  </TableCell>
                </TableRow>
              ]
              :
              data.map(i =>
                <TableRow key={i.id}>

                  <TableCell align="center">
                    {i.invoiceNumber}
                  </TableCell>

                  <TableCell align="center">
                    {`${i.firstName} ${i.lastName}`}
                  </TableCell>

                  <TableCell align="center">
                    {i.slotNumber}
                  </TableCell>

                  <TableCell align="center">
                    {i.amount}
                  </TableCell>

                  <TableCell align="center">
                    {moment(i.dueDate).format("MMM DD, YYYY")}
                  </TableCell>

                  <TableCell align="center">
                    {status(i)}
                  </TableCell>

                  <TableCell align="right">
                    <NavigateNextOutlinedIcon onClick={() => history.push(`/invoices/${i.id}/details`)} />
                  </TableCell>

                </TableRow>
              )
          }
        />
      }
    />
  );
}

export default Payment;