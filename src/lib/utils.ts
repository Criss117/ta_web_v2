import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms = 500) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
	amount: number,
	locale: Intl.LocalesArgument = "es-CO",
	currency: Intl.NumberFormatOptions["currency"] = "COP",
): string {
	if (Number.isNaN(amount)) {
		return "";
	}

	return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
		amount,
	);
}

export function validateStock(data: {
	newQuantity: number;
	currentStock: number;
	totalStock: number;
}): {
	quantity: number;
	currentStock: number;
} {
	const { newQuantity, currentStock, totalStock } = data;

	if (newQuantity <= 0) {
		return {
			quantity: 1,
			currentStock: currentStock,
		};
	}

	if (newQuantity > totalStock) {
		return {
			quantity: totalStock,
			currentStock: 0,
		};
	}

	return {
		quantity: newQuantity,
		currentStock: totalStock - newQuantity,
	};
}
