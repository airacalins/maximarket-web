import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoiceDetailsAsync, updateInvoicePaymentStatusAsync } from "./invoiceSlice";
import { getInvoiceStatusColor, getInvoiceStatusText, getPaymentStatusColor, getPaymentStatusText } from "../../app/utils/common";
import { currencyFormatter } from "../../app/layouts/formatter/common";
import { Label } from "semantic-ui-react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableRow from '@mui/material/TableRow';
import moment from "moment";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import CustomTable from "../../app/layouts/components/table/CustomTable";
import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import UpdateButton from "../../app/layouts/components/buttons/UpdateButton";
import { PaymentStatus } from "../../app/models/invoice";
import { Paper, TableHead } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import './PaymentDetails.scss';

const PaymentDetails = () => {

    const { invoice, isFetchingDetails } = useAppSelecter(state => state.invoice);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) dispatch(fetchInvoiceDetailsAsync(id));
    }, [])

    const totalAmountPaid = useMemo(
        () => !!invoice && !!invoice.payments ?
            invoice.payments.filter(i => i.status == 2).reduce((previousValue, currentValue) =>
                previousValue + currentValue.amount, 0) : 0,
        [invoice]
    );

    if (isFetchingDetails || !invoice) return (<LoadingComponent content="Loading invoice details..." />)

    const {
        amount,
        balance,
        businessName,
        dueDate,
        firstName,
        invoiceItems,
        invoiceNumber,
        lastName,
        payments,
        phone,
        slotNumber,
    } = invoice

    const status = () => <Label content={getInvoiceStatusText(invoice.invoiceStatus)} color={getInvoiceStatusColor(invoice.invoiceStatus)} />
    const updateStatus = async (paymentId: string, isApproved: boolean) => {
        await dispatch(updateInvoicePaymentStatusAsync({ id: paymentId, isApproved }))
        dispatch(fetchInvoiceDetailsAsync(id!));
    }

    const paymentTableColumn = [
        { title: 'Date' },
        { title: 'Mode of Payment' },
        { title: 'Account Name' },
        { title: 'Account Number' },
        { title: 'Amount Paid' },
        { title: 'Proof of Payment' },
        { title: 'Status' },
        { title: '' },
    ]

    if (!invoice)
        return <LoadingComponent content="Loading invoice..." />

    return (
        <>
            <DetailsPage
                title="Invoice Details"
                backNavigationLink="/invoices"
                content={
                    <>
                        <div className="d-flex my-5">
                            <div className="w-75">
                                <DetailItem title="Name" value={`${firstName} ${lastName}`} space={2} />
                                <DetailItem title="Business Name" value={businessName} space={2} />
                                <DetailItem title="Contact Number" value={phone} space={2} />
                            </div>

                            <div className="w-25">
                                <DetailItem title="Invoice Number" value={invoiceNumber} space={6} />
                                <DetailItem title="Due Date" value={moment(dueDate).format("MMM DD, YYYY")} space={6} />
                                <DetailItem title="Status" value={status()} space={6} />
                            </div>
                        </div>

                        <div className="payment-details__title">Rental Payment For Slot Number {slotNumber}</div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="w-75" align="left" style={{ fontSize: 14 }} >
                                            Description
                                        </TableCell>

                                        <TableCell align="right" style={{ fontSize: 14 }} >
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        invoiceItems.map(i =>
                                            <TableRow>
                                                <TableCell>
                                                    {i.description}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {currencyFormatter(i.amount)}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }

                                    <TableRow>
                                        <TableCell align="right">
                                            <p className="font__bold">Total:</p>
                                        </TableCell>

                                        <TableCell align="right">
                                            <p className="font__bold">{currencyFormatter(amount)}</p>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            />

            <MainPage
                title="Payment"
                content={
                    <>
                        <CustomTable
                            navigateTo="/invoices/create"
                            noPagination
                            columns={paymentTableColumn}
                            rows={
                                !payments.length ?
                                    [
                                        <TableRow>
                                            <TableCell align="center" colSpan={paymentTableColumn.length}>
                                                No data
                                            </TableCell>
                                        </TableRow>
                                    ]
                                    :
                                    payments.map(payment =>
                                        <>
                                            <TableRow key={payment.id}>

                                                <TableCell align="center">
                                                    {moment(payment.dateCreated).format("MMM DD, YYYY")}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.bankName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.accountName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {payment.accountNumber}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {currencyFormatter(payment.amount)}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <a href={payment.imageUrl} target='_blank'  >
                                                        <ImageOutlinedIcon sx={{ color: "#F2711C" }} />
                                                    </a>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Label content={getPaymentStatusText(payment.status)} color={getPaymentStatusColor(payment.status)} />
                                                </TableCell>

                                                <TableCell align="center">
                                                    {
                                                        !(payment.status === PaymentStatus.Approved || payment.status === PaymentStatus.Declined) &&
                                                        <>
                                                            <UpdateButton title="Approve" color="blue" onClick={() => updateStatus(payment.id, true)} />
                                                            <UpdateButton title="Decline" color="red" onClick={() => updateStatus(payment.id, false)} />
                                                        </>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                            }
                        />

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }}>
                                <TableBody>

                                    <TableRow>
                                        <TableCell className="w-75" align="right">
                                            <p className="font__bold">Balance:</p>
                                        </TableCell>

                                        <TableCell align="right">
                                            <p className="font__bold">{currencyFormatter(amount - totalAmountPaid)}</p>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            />
        </>
    );
}

export default PaymentDetails;