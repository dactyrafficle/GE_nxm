# ge_nxmxm

The basic model: 

https://dactyrafficle.github.io/GE_nxm/

There are:
 * n consumers
 * m firms
 * m goods (each firm makes 1 good, which is different from every other good)
 * all firms are owned by consumers thru shares

I'm using this as a starting point to look at more interesting ideas
  * m firms, but k goods
  * intermediate goods (ie. one firm makes a good which is an input for another firm)
  * taxes + government actors
  * multiple labor markets
  * inferior goods


The approach I'm using to solve this is very naive. 

Every term in every market can be expressed as a combination of exogenous variables, and the price vector.

So for a given price vector, I return the sum of squares of excess supply, exx. If there are 3 goods + labor, there are 4 markets. For a given price vector, I check each market and do exx += (supply-demand)^2 

I'm treating exx like a measure of how bad a price vector is.

The algorithm starts at some price vector, and walks in the direction of improvement. When it can't improve any more, it takes smaller steps. Once the steps get small enough, it stops.

The results are easy to verify. But the methodology, I'm not too sure about. It works here, but I don't know what conditions need to be met for it work. Because in other, more complex markets, this method does not work.



I'm using KaTeX to render the bit of math I've added : https://github.com/KaTeX/KaTeX/releases
