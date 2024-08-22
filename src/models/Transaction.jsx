import {ICONS} from "../icons/IconsExport"

export const TRANSACTION_TYPE = {
    EXPENSE: 0,
    INCOME: 1
}

export const EXP_CATEGORY = {
    ANIMALS: 'Animals',
    COSMETICS: 'Cosmetics',
    EATING_OUT: "Eating out",
    ENTERTAINMENT: "Entertainment",
    GROCERIES: "Groceries",
    HEALTH: "Health",
    HOUSE: 'House',
    PARTYING: "Partying",
    SPORT: "Sport",
    TAXES: "Taxes",
    TRANSPORTATION: "Transportation",
    VACATION: "Vacation",
}

export const INC_CATEGORY = {
    SALARY: "Salary",
    SAVINGS: "Savings",
    OTHER: "Other"
}

export const CATEGORY = {
    ...EXP_CATEGORY, ...INC_CATEGORY
}

export const EXP_CATEGORY_TO_ICON = {
    [CATEGORY.ANIMALS]: ICONS.cat,
    [CATEGORY.COSMETICS]: ICONS.aloeVera,
    [CATEGORY.EATING_OUT]: ICONS.friedRice,
    [CATEGORY.ENTERTAINMENT]: ICONS.television,
    [CATEGORY.GROCERIES]: ICONS.shop,
    [CATEGORY.HEALTH]: ICONS.hospital,
    [CATEGORY.HOUSE]: ICONS.home,
    [CATEGORY.PARTYING]: ICONS.beer,
    [CATEGORY.SPORT]: ICONS.gym,
    [CATEGORY.TAXES]: ICONS.taxes,
    [CATEGORY.TRANSPORTATION]: ICONS.bus,
    [CATEGORY.VACATION]: ICONS.airplane,
};

export const INC_CATEGORY_TO_ICON = {
    [CATEGORY.SALARY]: ICONS.paymentDay,
    [CATEGORY.SAVINGS]: ICONS.saving,
    [CATEGORY.OTHER]: ICONS.questionSign,
};

export const CATEGORY_TO_ICON = {
    ...EXP_CATEGORY_TO_ICON, ...INC_CATEGORY_TO_ICON
}

// export const HISTORY = [
//     {
//         id: 1,
//         category: CATEGORY.TRIPS,
//         amount: 4.56,
//         date: new Date(),
//         type: TRANSACTION_TYPE.EXPENSE
//     },
//     {
//         id: 2,
//         category: CATEGORY.TRANSPORTATION,
//         amount: 45.00,
//         date: new Date(),
//         type: TRANSACTION_TYPE.EXPENSE
//     },
//     {
//         id: 3,
//         category: CATEGORY.HEALTH,
//         amount: 230.00,
//         date: new Date(),
//         type: TRANSACTION_TYPE.EXPENSE
//     },
//     {
//         id: 4,
//         category: CATEGORY.EATING_OUT,
//         amount: 23.98,
//         date: new Date(),
//         type: TRANSACTION_TYPE.EXPENSE
//     },
//     {
//         id: 5,
//         category: CATEGORY.TRANSPORTATION,
//         amount: 50,
//         date: new Date(),
//         type: TRANSACTION_TYPE.EXPENSE
//     },
//     {
//         id: 6,
//         category: CATEGORY.SALARY,
//         amount: 1400,
//         date: new Date(),
//         type: TRANSACTION_TYPE.INCOME
//     }
// ]