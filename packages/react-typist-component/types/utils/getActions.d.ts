import type { Action } from '../types/actions';
import type { Splitter } from '../types/TypistProps';
/**
 * Returns an actions array generated from ReactNode.
 * `Main` component will use these actions to determine what it should do.
 */
declare const getActions: (node: React.ReactNode, splitter: Splitter) => Action[];
export default getActions;
//# sourceMappingURL=getActions.d.ts.map