enum DECIMALS {
    token = 4,
    usd = 2,
}

export const formatNumber = (value: number, isTokenNumber = true) => {
    if (isNaN(value)) return value;  // Проверка на валидность числа

    if (Number(value) === 0) {
        return '0.00';
    }

    const decimals = isTokenNumber ? DECIMALS.token : DECIMALS.usd;

    // Форматируем число с нужным количеством десятичных знаков
    const [integerPart, decimalPart] = Number(value).toFixed(decimals).split('.');

    // Разделяем единицы, десятки и сотни запятой
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const slicedDecimalPart = decimalPart ? decimalPart.slice(0, decimals) : '';
    // Обрезаем десятичную часть до нужного количества знаков
    const formattedDecimalPart = slicedDecimalPart ? '.' + (slicedDecimalPart !== '0000' ? slicedDecimalPart : '00') : '';

    return formattedIntegerPart + formattedDecimalPart;
}

export const formatIntNumber = (value: number) => {
    if (isNaN(value)) return value;  // Проверка на валидность числа

    if (Number(value) === 0) {
        return '0';
    }

    // Разделяем единицы, десятки и сотни запятой
    const formattedIntegerPart = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedIntegerPart;
}