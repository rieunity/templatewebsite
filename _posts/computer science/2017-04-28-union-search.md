---
layout: post
title: Union Search
categories: computer
---
合并-查找算法要解决的是连通性问题，假设有N个元素，以及这N个元素的元素对集合G，如果两个元素p、q在集合G中有元素对(p,q)，则我们称元素p和q是连通的。我们设计的程序不仅要能够将连通关系表示出来，还需要判断任意两个元素之间是否连通。

## 快速-查找算法(quick-find algorithm)
该算法把元素赋予整数值，连通的元素赋予相同的整数值。
```c
#include <stdio.h>
#define N 10000
main()
{
    int i, p, q, t, id[N];
    for (i = 0; i < N; i++) {
        id[i] = i;
    }
    while (scanf("%d %d",&p, &q ) ==2) {
        if (id[p]==id[q]) continue;
        for (t = id[p],i = 0; i < N ; i++) {
            if (id[i] == t) id[i] = id[q];
        }
        printf("%d %d\n", p, q);
    }
}
```
可以看到该算法的速度正比于MN的，M指的是合并操作次数。

## 快速-合并算法(quick-union algorithm)
该算法判断两个元素是否连通是通过元素的指向，比如元素a指向元素b，元素b指向元素c，那么判断a和b是否连通就通过寻找他们的最终指向，由于最终都是指向c，所以他们是连通的。该算法只需要将前述代码的while循环部分换成以下
```c
for (i = p; id[i] != i; i = id[i]);
for (j = q; id[j] != j; j = id[j]);
id[i] = j;
printf("%d %d\n", p, q);
```
显然这个算法要比之前的算法改进了许多，但是它的速度依赖于我们输入的数据。假设我们需要执行M次合并操作，并且M>N，前N次操作我们依次输入数对(1,2),(2-3),...,(N-1,N)，那么要对元素1进行查找时，就必须遍历N-1个指针，平均遍历指针数则为(N-1)/2。对剩下的操作，我们假定都是把1连接到某个元素上面，这样至少访问N-1次指针，那么由此可知，这种极端情况下我们执行M个查找操作访问指针的次数不少于MN/2.

## 加权快速合并算法(weighted quick-union algorithm)
为了避免出现快速-合并算法中最糟糕的情况出现，可以记录每棵树的节点数，然后将较小的树连接到较大的树上，程序如下
```c
#include <stdio.h>
#define N 10000
main()
{
    int i, j, p, q, id[N], sz[N];
    for (i = 0; i < N; i++) {
        id[i] = i;
        sz[i] = 1;
    }
    while (scanf("%d %d", &p, &q) == 2) {
        for(i = p; i != id[i]; i = id[i]);
        for(j = q; j != id[j]; j = id[j]);
        if (i == j) continue;
        if (sz[i] < sz[j]) {
            id[i] = j;
            sz[j] += sz[i];
        } else {
            id[j] = i;
            sz[i] += sz[j];
        }
        printf("%d %d\n", p, q);
    }
}

```
这个算法最坏的一种情况就是合并操作的时候归并的集合总是有相同的节点数，对于该算法每次查找并判定两个元素是否连通最多需要遍历$2\log{N}$个指针。
