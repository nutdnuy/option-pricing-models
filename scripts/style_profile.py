"""Shared matplotlib style profile for the option-pricing paper (amsart / bw).

Every figure script imports STYLES and apply_style() from here so that the
whole document is visually consistent. Black & white: lines are distinguished
by linestyle + marker together, never by colour alone.
"""

import matplotlib.pyplot as plt

# ---- Global rcParams (amsart, Computer Modern / serif, print-safe) ----------
RCPARAMS = {
    "font.family": "serif",
    "font.serif": ["Times New Roman", "DejaVu Serif"],
    "mathtext.fontset": "dejavuserif",
    "figure.dpi": 300,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.alpha": 0.35,
    "grid.linestyle": "--",
    "axes.linewidth": 0.8,
    "font.size": 9,
    "axes.labelsize": 9,
    "axes.titlesize": 9,
    "legend.fontsize": 8,
    "xtick.labelsize": 8,
    "ytick.labelsize": 8,
}

# ---- BW line styles: (color, linestyle, marker) -----------------------------
# All greyscale; disambiguation via linestyle + marker.
STYLES = [
    {"color": "black",  "linestyle": "-",  "marker": "o"},
    {"color": "0.35",   "linestyle": "--", "marker": "s"},
    {"color": "0.0",    "linestyle": "-.", "marker": "^"},
    {"color": "0.5",    "linestyle": ":",  "marker": "D"},
    {"color": "0.25",   "linestyle": (0, (3, 1, 1, 1)), "marker": "v"},
]

# Single column width for amsart (~ 4.75in text width); 1-panel default.
COL_WIDTH = 3.5   # inches
FULL_WIDTH = 4.75  # inches


def apply_style():
    plt.rcParams.update(RCPARAMS)


def style(i):
    """Return the i-th bw style dict (cycles)."""
    return STYLES[i % len(STYLES)]
