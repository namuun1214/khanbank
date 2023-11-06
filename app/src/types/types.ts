export type USER_ROOM_DATA_TYPE = {
    id: string;
    status: 'accepted' | 'declined' | 'pending'
}
export type ROOM_USER_DATA_TYPE = {
    phoneNumber: string;
    isPaid: boolean;
    fee: 'string'
}
export type USER_DATA_TYPE = {
    phoneNumber: string;
    accountNumber: string;
    bankName: string;
    name: string;
    rooms: USER_ROOM_DATA_TYPE[]
}
export type ROOM_DATA_TYPE = {
    adminUser: string;
    isActive: boolean;
    roomName: string;
    users: ROOM_USER_DATA_TYPE[]
}