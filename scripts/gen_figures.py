"""Generate BW tree diagrams (binomial + trinomial) for the paper.

Produces three variants of each figure:
  figures/full/   -> nodes + edge labels (u,d / u,m,d) + annotation
  figures/label/  -> nodes with S-values, no edge annotation
  figures/plain/  -> clean nodes only

Run:  python scripts/gen_figures.py
"""

import os
import matplotlib.pyplot as plt
from style_profile import apply_style, COL_WIDTH

apply_style()

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DIRS = {v: os.path.join(ROOT, "figures", v) for v in ("full", "label", "plain")}
for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

NODE_KW = dict(s=520, facecolors="white", edgecolors="black",
               linewidths=1.1, zorder=3)


# ----------------------------------------------------------------------------
# Recombining binomial tree
# ----------------------------------------------------------------------------
def binomial(variant, n=3):
    fig, ax = plt.subplots(figsize=(COL_WIDTH, COL_WIDTH * 0.85))
    # node coordinates: level i (x=i), up-moves j (0..i); y = 2*j - i
    coords = {}
    for i in range(n + 1):
        for j in range(i + 1):
            coords[(i, j)] = (i, 2 * j - i)

    # edges
    for i in range(n):
        for j in range(i + 1):
            x0, y0 = coords[(i, j)]
            for dj, mv in ((1, "u"), (0, "d")):
                x1, y1 = coords[(i + 1, j + dj)]
                ax.plot([x0, x1], [y0, y1], color="black", lw=0.9, zorder=1)
                if variant == "full" and i == 0:
                    ax.annotate(mv, xy=((x0 + x1) / 2, (y0 + y1) / 2),
                                fontsize=9, ha="center", va="center",
                                bbox=dict(boxstyle="round,pad=0.12", fc="white",
                                          ec="none"))

    xs = [c[0] for c in coords.values()]
    ys = [c[1] for c in coords.values()]
    ax.scatter(xs, ys, **NODE_KW)

    if variant in ("full", "label"):
        for (i, j), (x, y) in coords.items():
            nu, nd = j, i - j
            if i == 0:
                lab = r"$S_0$"
            else:
                up = f"u^{{{nu}}}" if nu > 1 else ("u" if nu == 1 else "")
                dn = f"d^{{{nd}}}" if nd > 1 else ("d" if nd == 1 else "")
                lab = rf"$S_0{up}{dn}$"
            ax.annotate(lab, xy=(x, y), fontsize=6.5, ha="center", va="center",
                        zorder=4)

    if variant == "full":
        ax.text(0.5, min(ys) - 1.15, r"$p^\ast=\dfrac{e^{r\Delta t}-d}{u-d}$",
                fontsize=8, ha="left", va="center")

    ax.set_xlim(-0.4, n + 0.4)
    ax.set_ylim(min(ys) - (1.6 if variant == "full" else 0.6), max(ys) + 0.6)
    ax.set_xticks(range(n + 1))
    ax.set_xticklabels([rf"$t_{{{i}}}$" for i in range(n + 1)])
    ax.set_yticks([])
    ax.grid(False)
    ax.spines["left"].set_visible(False)
    ax.spines["bottom"].set_visible(True)
    fig.savefig(os.path.join(DIRS[variant], "binomial_tree.pdf"))
    plt.close(fig)


# ----------------------------------------------------------------------------
# Recombining trinomial tree
# ----------------------------------------------------------------------------
def trinomial(variant, n=2):
    fig, ax = plt.subplots(figsize=(COL_WIDTH, COL_WIDTH * 0.85))
    # at level i, states j in [-i, i]; y = j
    coords = {}
    for i in range(n + 1):
        for j in range(-i, i + 1):
            coords[(i, j)] = (i, j)

    for i in range(n):
        for j in range(-i, i + 1):
            x0, y0 = coords[(i, j)]
            for dj, mv in ((1, "u"), (0, "m"), (-1, "d")):
                x1, y1 = coords[(i + 1, j + dj)]
                ax.plot([x0, x1], [y0, y1], color="black", lw=0.9, zorder=1)
                if variant == "full" and i == 0:
                    ax.annotate(mv, xy=(x0 + 0.55, (y0 + y1) / 2 + 0.02),
                                fontsize=9, ha="center", va="center",
                                bbox=dict(boxstyle="round,pad=0.1", fc="white",
                                          ec="none"))

    xs = [c[0] for c in coords.values()]
    ys = [c[1] for c in coords.values()]
    ax.scatter(xs, ys, **NODE_KW)

    if variant in ("full", "label"):
        for (i, j), (x, y) in coords.items():
            if i == 0:
                lab = r"$S_0$"
            elif j > 0:
                lab = rf"$S_0u^{{{j}}}$" if j > 1 else r"$S_0u$"
            elif j < 0:
                lab = rf"$S_0d^{{{-j}}}$" if j < -1 else r"$S_0d$"
            else:
                lab = r"$S_0$"
            ax.annotate(lab, xy=(x, y), fontsize=6.5, ha="center", va="center",
                        zorder=4)

    if variant == "full":
        ax.text(0.0, min(ys) - 1.15,
                r"$p_u+p_m+p_d=1,\quad ud=1$",
                fontsize=8, ha="left", va="center")

    ax.set_xlim(-0.4, n + 0.4)
    ax.set_ylim(min(ys) - (1.6 if variant == "full" else 0.6), max(ys) + 0.6)
    ax.set_xticks(range(n + 1))
    ax.set_xticklabels([rf"$t_{{{i}}}$" for i in range(n + 1)])
    ax.set_yticks([])
    ax.grid(False)
    ax.spines["left"].set_visible(False)
    ax.spines["bottom"].set_visible(True)
    fig.savefig(os.path.join(DIRS[variant], "trinomial_tree.pdf"))
    plt.close(fig)


# ----------------------------------------------------------------------------
# Convergence figure: binomial vs trinomial price error vs steps
# ----------------------------------------------------------------------------
def convergence():
    import numpy as np
    from math import log, sqrt, exp
    from scipy.stats import norm
    from style_profile import style

    S0, K, r, sigma, T = 100.0, 100.0, 0.05, 0.2, 1.0

    def bs_call(S0, K, r, sigma, T):
        d1 = (log(S0 / K) + (r + 0.5 * sigma**2) * T) / (sigma * sqrt(T))
        d2 = d1 - sigma * sqrt(T)
        return S0 * norm.cdf(d1) - K * exp(-r * T) * norm.cdf(d2)

    def binom_call(N):
        dt = T / N
        u = exp(sigma * sqrt(dt)); d = 1 / u
        p = (exp(r * dt) - d) / (u - d)
        j = np.arange(N + 1)
        ST = S0 * u**j * d**(N - j)
        val = np.maximum(ST - K, 0.0)
        disc = exp(-r * dt)
        for _ in range(N):
            val = disc * (p * val[1:] + (1 - p) * val[:-1])
        return val[0]

    def trinom_call(N):
        dt = T / N
        u = exp(sigma * sqrt(2 * dt)); d = 1 / u
        a = exp(r * dt / 2); b = exp(sigma * sqrt(dt / 2))
        pu = ((a - 1 / b) / (b - 1 / b))**2
        pd = ((b - a) / (b - 1 / b))**2
        pm = 1 - pu - pd
        disc = exp(-r * dt)
        idx = np.arange(-N, N + 1)
        val = np.maximum(S0 * u**np.maximum(idx, 0) * d**np.maximum(-idx, 0) - K, 0.0)
        for step in range(N, 0, -1):
            new = disc * (pu * val[2:] + pm * val[1:-1] + pd * val[:-2])
            val = new
        return val[0]

    truth = bs_call(S0, K, r, sigma, T)
    Ns = list(range(5, 121, 3))
    eb = [abs(binom_call(n) - truth) for n in Ns]
    et = [abs(trinom_call(n) - truth) for n in Ns]

    fig, ax = plt.subplots(figsize=(COL_WIDTH, COL_WIDTH * 0.8))
    s0, s1 = style(0), style(1)
    ax.plot(Ns, eb, color=s0["color"], linestyle=s0["linestyle"],
            marker=s0["marker"], markersize=3, markevery=4, lw=0.9,
            label="Binomial")
    ax.plot(Ns, et, color=s1["color"], linestyle=s1["linestyle"],
            marker=s1["marker"], markersize=3, markevery=4, lw=0.9,
            label="Trinomial")
    ax.set_yscale("log")
    ax.set_xlabel(r"Number of steps $N$")
    ax.set_ylabel(r"Absolute pricing error $|\hat C_N - C_{BS}|$")
    ax.legend()
    for v in ("full", "label", "plain"):
        fig.savefig(os.path.join(DIRS[v], "convergence.pdf"))
    plt.close(fig)


if __name__ == "__main__":
    for v in ("full", "label", "plain"):
        binomial(v)
        trinomial(v)
    convergence()
    print("Figures written to figures/{full,label,plain}/")
