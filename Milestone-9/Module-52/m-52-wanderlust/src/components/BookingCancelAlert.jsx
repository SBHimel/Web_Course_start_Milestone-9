"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

export function BookingCancelAlert({ bookingId }) {

    const handleCancelBooking = async (id) => {

        const {data:tokenData} = await authClient.token()
        console.log(tokenData);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
            {
                method: "DELETE",
                headers: {
                    "content-type" : "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                }
            }
        );

        const data = await res.json();

        // console.log(data);

        window.location.reload();
    };

    return (
        <AlertDialog>
            <Button
                className="
                                    rounded-xl
                                    border-red-500
                                    text-red-500
                                    hover:bg-red-500
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                variant="outline"
            >
                <TrashBin />
                Cancel Booking
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel project permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>

                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleCancelBooking} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}