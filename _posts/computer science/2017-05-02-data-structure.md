---
layout: post
title: Data Structure
categories: computer
---
除了c语言本身定义的最基本的数据类型外，这里主要讨论的是数组以及链表。

## 接口-实现-客户端模式(interface-implementation-client)
为了让程序具有灵活性，可以用这种模式实现代码的封装。考虑计算由库函数rand()产生的随机数列的平均值和标准方差，随机数的个数由输入决定，可写成以下形式
```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
typedef int Number;
Number randNum()
{return rand();}
main(int argc, char const *argv[]) {
    int i, N = atoi(argv[1]);
    float m1 = 0.0, m2 = 0.0;
    Number x;
    for (i = 0; i < N; i++)
    {
        x = randNum();
        m1 += ((float) x)/N;
        m2 += ((float) x*x)/N;
    }
    printf("       Average: %1f\n", m1);
    printf("Std. deviation: %1f\n", sqrt(m2-m1*m1));
}
```
下面将接口、实现、客户端进行分离，接口部分Num.h是数据类型的声明和该数据类型有关的操作
```c
typedef int Number;
Number randNum();
```
实现部分int.c是randNum函数的实现
```c
#include <stdlib.h>
#include "Num.h"
Number randNum()
{return rand();}
```
客户端avg.c包含接口声明以及程序的主体部分
```c
#include <stdio.h>
#include <math.h>
#include "Num.h"
int main(int argc, char const *argv[]) {
    int i, N = atoi(argv[1]);
    float m1 = 0.0, m2 = 0.0;
    Number x;
    for (i = 0; i < N; i++) {
        x = randNum();
        m1 += ((float) x)/N;
        m2 += ((float) x*x)/N;
    }
    printf("      Average: %1f\n", m1);
    printf("Std.deviation: %1f\n", sqrt(m2-m1*m1));
}
```
然后将avg.c和int.c一起编译，就与最初的程序功能相同。

## 数组

### 数组的动态存储分配
有两种给数组分配空间的方式，一种是预先给定数组大小，另一种是按照给定问题的规模来分配空间，即动态存储分配
```c
#include<stdio.h>
int main(int argc, char const *argv[]) {
    long int i, j, N = atol(argv[1]);
    int* a = malloc(N*sizeof(int));
    if (a == NULL) {
        printf("Insufficient memory.\n");
    }
    ...
    return 0;
}
```

### 数组动态分配举例
下面是一个数组应用的例子：抛硬币的32次正面朝上的概率分布图，对该实验进行10000次测试
```c
#include <stdlib.h>
#include <stdio.h>
int heads()
{
    return rand() < RAND_MAX/2;
}
int main(int argc, char const *argv[]) {
    int i, j, cnt;
    int N = atoi(argv[1]), M = atoi(argv[2]);
    int* f = malloc((N + 1)*sizeof(int));
    for (j = 0; j <= N; j++) f[j] =0;
    for (i = 0; i< M; i++, f[cnt]++)
    for (cnt = 0, j = 0; j <= N; j++) {
        if (heads()) cnt++;
    }
    for(j = 0; j<= N; j++)
    {
        printf("%2d", j);
        for (i = 0; i < f[j]; i += 100) {
            printf("*");
        }
        printf("\n");
    }
}
```
其中输入N=32， M=10000，最后结果为
```
0
1
2
3
4
5
6*
7*
8*
9*
10**
11***
12*****
13*******
14**********
15*************
16***************
17**************
18************
19**********
20*******
21*****
22***
23**
24*
25*
26*
27*
28
29
30
31
32
```

## 链表

### 链表的基本结构
链表由结构体来表示，包含了节点内容和链接两部分，基本结构如下所示
```c
typedef struct node* link;
struct node {
    Item item;
    link next;
}
```
创建新节点代码如下
```c
link x = malloc(sizeof *x);
```
引用节点的数据内容和链接分别为`(*x).item`和`(*x).next`，由于这两个操作经常用到，所以c语言提供了与之等价的简洁形式`x->item`和`x->next`。

### 删除节点操作
假设有三个顺序节点x->t->y，删除节点t的操作为
```c
t = x->next; x->next = t->next;
```
或者
```c
x->next = x->next->next;
```
当我们删除一个节点后，该节点可能再也用不到了，则可以使用函数free将其从内存中释放：
```
x->next = x->next->next; free(t);
```
### 插入节点操作
将节点t插入到节点x后的操作为
```c
t->next = x->next; x->next = t;
```

###循环列表示例(约瑟夫问题)
N个人围成一圈，从第一个人开始数，将每隔第M个人删除，求出最后剩下的是哪一个人，代码如下
```c
#include <stdio.h>
#include <stdlib.h>
typedef struct node* link;
struct node {
    int item;
    link next;
};
int main(int argc, char const *argv[]) {
    int i, N = atoi(argv[1]), M = atoi(argv[2]);
    link t = malloc(sizeof *t), x = t;
    t->item = 1; t->next = t;
    for(i = 2; i <=N; i++)
    {
        x = (x->next = malloc(sizeof *x));
        x->item = i;
        x->next = t;
    }
    while (x != x->next)
    {
        for (i = 1; i<M; i++) x = x->next;
        t = x->next;
        x->next = x->next->next;
        free(t);
    }
    printf("%d\n", x->item);
    return 0;
}
```
最后运行的结果是第8位剩下。

## 字符串
字符串是一个字符数组并且以0作为结束符，数组和指针有着密切的关系，例如一个数组`a[10]`中的a可以表示指向数组首地址的指针，所以对字符串的处理操作有指针和索引两种方式，见下

需要实现的操作 | 索引数组版本 | 指针版本
------------ | ----------- | -------
计算字符串长度 | `for (i = 0; a[i] != 0; i++); return i;` | `b = a; while (*b++); return b - a - 1;`
复制 | `for (i = 0; (a[i]=b[i])!=0; i++);` | `while (*a++ = *b++)`

下面是一个利用指针计算字符串长度的例子
```c
#include <stdio.h>
#define N 10000
int main(int argc, char const *argv[]) {
    char a[N];
    char* b;
    scanf("%s", a);
    b = a;
    while (*b++);
    printf("%d\n", b - a - 1);
    return 0;
}
```

## 复合数据结构

###二维数组
二维数组`a[M][N]`实际上是由M个一维数组组成，例如`a[i][j]`实际上就是`a[N*i+j]`。
二维数组内存分配和一维数组类似，对于上述的二维数组，可以使用下面语句
```c
int* a = malloc(M*N*sizeof(int));
```
但是这里有个前提，这是以行为主序的情况下适用。对于不是以行为主序的情况，这种方法就不行了。下面通过二维数组的定义，给出二维数组的内存分配解决方法
```c
//构造函数malloc2d(M, N),然后 调用该函数 int **a = malloc2d(M, N);
int **malloc2d(int r, int c)
{
    int i;
    int** t = malloc(r * sizeof(int *));
    for (i = 0; i < r; i++) {
        t[i] = malloc(c * sizeof(int));
        return t;
    }
}
```

### 字符串数组排序
字符串数组的排序是利用指针的重新指向进行的，将字符串存储在缓冲区buf中，将指针数组a的每一项分别指向buf中的每个字符串，那么字符串的重排就可以通过指针的重新指向来完成。为了完成这个任务，这里用到库函数qsort，它有四个参数：指向数组起始位置的指针、对象的个数、每个对象的大小和一个比较函数。排序程序如下
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define Nmax 1000
#define Mmax 10000
char buf[Mmax];
int M = 0;
int compare(void *i, void *j)
{
    return strcmp(*(char **)i, *(char **)j);
}
main()
{
    int i, N;
    char* a[Nmax];
    for (N = 0; N < Nmax; N++)
    {
        a[N] = &buf[M];
        if (scanf("%s", a[N]) == EOF) break;
        M += strlen(a[N]) + 1;
    }
    qsort(a, N, sizeof(char*), compare);
    for (i = 0; i < N; i++) {
        printf("%s\n", a[i]);
    }
}
```
注意EOF，文件结束位置或者数据输入错误时会返回该值，如果要在键盘输入时产生该项：
* Linux系统中，换行后按ctrl+d
* Windows系统中，换行后按ctrl+z，再回车确认

### 图的邻接表示
图的邻接矩阵表示
```c
for (i = 0; i < V; i++) adj[i][i] = 1;
while (scanf("%d %d\n", &i, &j) == 2) {
    adj[i][j] = 1;
    adj[j][i] = 1;
}
```
图的邻接表表示
```c
#include<stdio.h>
#include<stdlib.h>
#define V 10000
typedef struct node *link;
struct node{
    int v;
    link next;
}
link NEW(int v, link next)
{
    link x = malloc(sizeof* x);
    x->v = v;
    x->next = next;
    return x;
}
main()
{
    int i, j;
    link adj[V];
    for(i = 0; i < V; i++) adj[i] = NULL;
    while (scanf("%d %d\n", &i, &j) == 2) {
        adj[j] = NEW(i, adj[j]);
        adj[i] = NEW(j, adj[i]);
    }
}
```
图的邻接表表示中，构造了一个数据类型为链表的数组，数组的第i个元素中的所有链表就是与第i个节点相邻的节点。

可以看到，邻接矩阵表示所用空间正比于$V^2$，邻接表表示正比于$V+E$，当边数比较少时第二种方法使用空间较少，当边数比较多时第一种方法使用空间较少。
