/**
 * @public
 */
export declare type ContentCard = {
    id: string;
    component?: string;
    type?: string;
    data: Record<string, unknown>;
};
/**
 * @public
 */
export declare type ContentCardRawData = Record<'id' | 'type' | string, unknown>;
/**
 * @public
 */
export declare type ContentCardFormattedData = {
    id: string;
    data: ContentCardRawData;
};
//# sourceMappingURL=Conversation.d.ts.map