### Algorithm for the Whole Conversion

Use the following steps to convert an infix expression to postfix form:

1. Scan the infix expression from left to right.
2. If the scanned symbol is an operand, add it directly to the output.
3. If the scanned symbol is `(`, push it onto the stack.
4. If the scanned symbol is an operator:
   - If the stack is empty, or the top of the stack is `(`, or the scanned operator has higher precedence than the operator on the top of the stack, push the scanned operator onto the stack.
   - Otherwise, pop operators from the stack and add them to the output until you find an operator with lower precedence or a `(`. Then push the scanned operator onto the stack.
5. If the scanned symbol is `)`, pop operators from the stack and add them to the output until `(` is found. Remove the `(` as well.
6. Repeat steps 1 to 5 until the entire infix expression has been scanned.
7. Pop any remaining operators from the stack and add them to the output.
