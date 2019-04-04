import { Pipe, PipeTransform } from '@angular/core';

/**
 * Two methods are supported: bestfit and sequential
 * 'bestfit': This means that that array will be sorted in ascending order of length of array items and maximum
 * number of items will be fitted in the output string.
 * 'sequential': This means that the array will be taken as is, and the first n possible items will be fitted.
 */
@Pipe({
    name: 'appshorten'
})
export class TextShortener implements PipeTransform {
    transform(arr: string[], method: string, lengthToShortenTo: number) {

        if (!arr || arr.length === 0 || !lengthToShortenTo) {
            return ``;
        }

        if (!method) {
            method = `bestfit`;
        }

        const commaSeparatedString = arr.join(` `);
        if (commaSeparatedString.length <= lengthToShortenTo) {
            // string is anyway less than target length, so nothing to do
            return commaSeparatedString;
        }

        const displayItems: string[] = [];
        let items: string[] = [];
        if (method === 'sequential') {
            items = arr.slice();
        } else {
            items = this.sortArrayByItemLength(arr);
        }

        let variableLen: number = lengthToShortenTo;

        /**
         * Checking each item in the list now.
         * For each item to be displayed, its length is subtracted from the target size.
         * The next item is checked against the reducing target length.
         * When an item's length falls short of the remaining target length, the loop is broken.
         * The items which could not be fitted in the displayItems array are marked as extras, and are displayed as 1 more or 2 more etc.
         */
        for (const item of items) {
            if (method === 'bestfit') {
                if (item.length < variableLen) {
                    displayItems.push(item);
                    variableLen -= item.length;
                }
            } else {
                if (item.length <= variableLen) {
                    displayItems.push(item);
                    variableLen -= item.length;
                } else {
                    displayItems.push(item.substr(0, lengthToShortenTo));
                    variableLen = 0;
                    break;
                }
            }
        }

        const originalSize = arr.length;
        const displaySize = displayItems.length;
        const diff = (originalSize - displaySize);

        let output: string;

        if (originalSize === 1) {
            output = `${items[0].substr(0, lengthToShortenTo)}...`;
        } else {
            output = `${displayItems.join(', ')} and ${diff} more...`;
        }

        return `${output}`;

    }

    private sortArrayByItemLength(arr: string[]): string[] {
        return arr.sort((a, b) => {
            if (a.length > b.length) {
                return 1;
            }
            if (a.length < b.length) {
                return -1;
            }
            return 0;
        }).slice();
    }
}
