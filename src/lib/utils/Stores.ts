export let connected: boolean = false;
let visitorId: string | null = null;

export function getVisitorId() {
    return visitorId;
}

export function setVisitorId(id: string) {
    visitorId = id;
}