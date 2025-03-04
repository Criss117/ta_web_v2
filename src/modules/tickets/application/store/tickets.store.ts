import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TicketDetailStore,
  TicketState,
} from "@/modules/tickets/domain/types";
import { TicketsStoreService } from "@tickets/application/services/tickets-store.service";

export interface TicketsStoreState {
  selectedTicketId: string;
  tickets: TicketState[];
}

export interface TicketsStoreActions {
  createTicket: () => void;
  setSelectedTicketId: (id: string) => void;
  getSelectedTicket: () => TicketState | null;
  deleteTicket: (temporaryId: string) => void;
  clearTicket: (temporaryId: string) => void;
  changeTicketName: (temporaryId: string, name: string) => void;
  deleteDetail: (barcode: string) => void;
  addTicketDetail: (detail: TicketDetailStore) => void;
  changeSalePriceOrQuantity: (
    barcode: string,
    salePrice: number,
    quantity: number
  ) => void;
}

type TicketsStore = TicketsStoreState & TicketsStoreActions;

const defaultTicket: TicketState = {
  temporaryId: crypto.randomUUID(),
  ticketName: null,
  ticketNumber: 1,
  detail: [],
};

export const useTicketsStore = create<TicketsStore>()(
  persist(
    (set, get) => ({
      tickets: [defaultTicket],
      selectedTicketId: defaultTicket.temporaryId,
      createTicket: () => {
        set((state) => {
          const { tickets, selectedTicketId } =
            TicketsStoreService.createTicket(state.tickets);

          return {
            tickets,
            selectedTicketId,
          };
        });
      },
      setSelectedTicketId: (id: string) => set({ selectedTicketId: id }),
      getSelectedTicket: () => {
        const { selectedTicketId, tickets } = get();

        return (
          tickets.find((ticket) => ticket.temporaryId === selectedTicketId) ??
          null
        );
      },
      deleteTicket: (temporaryId: string) => {
        set((state) => {
          const { tickets, selectedTicketId } =
            TicketsStoreService.deleteTicket(
              state.tickets,
              temporaryId,
              state.selectedTicketId
            );

          return {
            tickets,
            selectedTicketId,
          };
        });
      },
      clearTicket: (temporaryId: string) => {
        set((state) => {
          const tickets = TicketsStoreService.clearTicket(
            state.tickets,
            temporaryId
          );

          return {
            tickets,
          };
        });
      },
      changeTicketName: (temporaryId: string, name: string) => {
        set((state) => {
          const tickets = TicketsStoreService.changeTicketName(
            state.tickets,
            temporaryId,
            name
          );

          return {
            tickets,
          };
        });
      },
      addTicketDetail: (detail: TicketDetailStore) => {
        const { selectedTicketId } = get();

        set((state) => {
          const tickets = TicketsStoreService.addTicketDetail(
            state.tickets,
            selectedTicketId,
            detail
          );

          return {
            tickets,
          };
        });
      },
      changeSalePriceOrQuantity: (
        barcode: string,
        salePrice: number,
        quantity: number
      ) => {
        set((state) => {
          const tickets = TicketsStoreService.changeSalePriceOrQuantity({
            tickets: state.tickets,
            temporaryId: state.selectedTicketId,
            barcode,
            newSalePrice: salePrice,
            newQuantity: quantity,
          });

          return {
            tickets,
          };
        });
      },
      deleteDetail: (barcode: string) => {
        set((state) => {
          const tickets = TicketsStoreService.deleteDetail(
            state.tickets,
            state.selectedTicketId,
            barcode
          );

          return {
            tickets,
          };
        });
      },
    }),
    {
      name: "ta_web_v2_tickets",
    }
  )
);
