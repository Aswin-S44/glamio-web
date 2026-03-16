"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ADMIN_ID = exports.DEFAULT_SHOP_ID = exports.DEFAULT_CUSTOMER_ID = exports.appointmentStatuses = exports.appointmentStatusEnums = exports.usersTypes = void 0;
exports.usersTypes = {
    ADMIN: {
        name: "ADMIN",
    },
    SHOPS: {
        name: "SHOPS",
    },
    CUSTOMER: {
        name: "CUSTOMER",
    },
    EXPERT: {
        name: "EXPERT",
    },
    OPERATOR: {
        name: "OPERATOR",
    },
};
exports.appointmentStatusEnums = {
    PENDING: "pending",
    REJECTED: "rejected",
    ACCEPTED: "accepted",
    ON_HOLD: "on_hold",
};
exports.appointmentStatuses = {
    PENDING: {
        name: "pending",
    },
    REJECTED: {
        name: "rejected",
    },
    ACCEPTED: {
        name: "accepted",
    },
    ON_HOLD: {
        name: "on_hold",
    },
    COMPLETED: {
        name: "completed",
    },
};
exports.DEFAULT_CUSTOMER_ID = 1;
exports.DEFAULT_SHOP_ID = 2;
exports.DEFAULT_ADMIN_ID = 3;
