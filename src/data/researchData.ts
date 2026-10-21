export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  category: "VIGNETTE" | "TECHNICAL RELEASE" | "ANNOUNCEMENT";
  date: string;
  link: string;
  image: string;
}

export const researchItems: ResearchItem[] = [
  {
    id: "mathevia",
    title: "Mathevia: A Better Way To Learn",
    description:
      "An online learning platform and tutoring service designed to make mathematics engaging through visual learning, simplified concepts, and student-centered support.",
    category: "VIGNETTE",
    date: "8.11.2026",
    link: "https://mathevia.co.uk",
    image: "/mathevia.png",
  },
  {
    id: "population-media-center",
    title: "Population Media Centre: Discovering Nigeria's Impact",
    description:
      "A multimedia documentary and impact narrative highlighting 25 years of transformative storytelling, community empowerment, and social change across Nigeria.",
    category: "ANNOUNCEMENT",
    date: "8.3.26",
    link: "https://www.populationmedia.org",
    image: "/population-media-center.png",
  },
  {
    id: "online-kl-shampoo",
    title: "Online KL Shampoo",
    description:
      "We introduce Online KL Shampoo (OKLS), a zero-staleness, hardware-aligned, Kronecker product-based optimizer that achieves 1.45x Muon's parameter efficiency while maintaining 98% training throughput.",
    category: "TECHNICAL RELEASE",
    date: "7.28.26",
    link: "https://blog.tilderesearch.com/blog/online-kl-shampoo",
    image: "https://framerusercontent.com/images/2j5M1Ntx9KJ0oEW7mJnxDmGq0.png?width=1806&height=871",
  },
  {
    id: "parallax",
    title: "Parallax: Parameterized Local Linear Attention",
    description:
      "Parallax keeps the local-linear principle but parametrizes the solve directly → a single additive correction on top of Softmax.",
    category: "TECHNICAL RELEASE",
    date: "6.9.26",
    link: "https://blog.tilderesearch.com/blog/parallax",
    image: "https://framerusercontent.com/images/yumrVkL2XBIx4YsYN82oPR9O2zA.png?width=1012&height=526",
  },
  {
    id: "compositional-muon",
    title: "Towards Compositional Steepest Descent",
    description:
      "We introduce Compositional Muon (CM), which extends Muon-style steepest descent from individual matrices to composed transformer circuits.",
    category: "TECHNICAL RELEASE",
    date: "6.5.26",
    link: "https://blog.tilderesearch.com/blog/compositional-muon",
    image: "https://framerusercontent.com/images/ZtUAOxYUuoBLxO9SIOZZUoOiu0.png?width=1774&height=887",
  },
  {
    id: "wall-attn",
    title: "Wall Attention: Length Generalization With Diagonal Gates",
    description:
      "We introduce Wall Attention, which generalizes diagonal forget gates from linear RNNs to softmax attention, yielding a data-dependent positional encoding that is a full replacement for RoPE.",
    category: "TECHNICAL RELEASE",
    date: "6.2.26",
    link: "https://blog.tilderesearch.com/blog/wall-attn",
    image: "https://framerusercontent.com/images/ynwb3oByx9FQ6YBKZ8vDyPvy6w.png?width=1672&height=941",
  },
  {
    id: "aurora",
    title: "Aurora: Leverage-Aware Updates for Rectangular Matrices",
    description:
      "We formulate the problem of steepest descent under the joint constraint of row-norm uniformity and orthogonality and present Aurora as a solution.",
    category: "TECHNICAL RELEASE",
    date: "05.8.26",
    link: "https://blog.tilderesearch.com/blog/aurora",
    image: "https://framerusercontent.com/images/HeVlUvXBl4LLTQppNP6ywGib18.png?width=1206&height=582",
  },
  {
    id: "nitrobrew",
    title: "Nitrobrew: Fast, Lossless Distillation for Free",
    description:
      "Nitrobrew exploits the fact that teacher logits are generated from a much lower-dimensional hidden state, achieving 1.5-3x faster end-to-end throughput for on-policy distillation.",
    category: "TECHNICAL RELEASE",
    date: "04.28.2026",
    link: "https://blog.tilderesearch.com/blog/nitrobrew",
    image: "https://framerusercontent.com/images/C6EgSgTVs4pY5gvoeAZVpIOngE.png?width=1836&height=857",
  },
  {
    id: "gram-space",
    title: "Gram-Space Manifold Muon",
    description:
      "Recently, Bernstein and Thinking Machines introduced a Muon variant that constrains weights to the Stiefel manifold.",
    category: "VIGNETTE",
    date: "10.13.2025",
    link: "https://blog.tilderesearch.com/vignettes/gram-space",
    image: "https://framerusercontent.com/images/9K59s0uIDAyWMFGAggIlSrNxClY.jpg?width=928&height=448",
  },
  {
    id: "complexity",
    title: "Complexity and Transformers",
    description:
      "Can a simple transformer solve problems that constant-depth circuits cannot?",
    category: "VIGNETTE",
    date: "09.15.2025",
    link: "https://blog.tilderesearch.com/vignettes/complexity",
    image: "https://framerusercontent.com/images/5hZnBmK8MNBbRf6qOblBMAh15Y.jpg?width=928&height=448",
  },
  {
    id: "regression",
    title: "Regression is All You Need",
    description:
      "There are many derivations of attention available. In this vignette we present our favorite from nonparametric regression.",
    category: "VIGNETTE",
    date: "08.28.2025",
    link: "https://blog.tilderesearch.com/vignettes/regression",
    image: "https://framerusercontent.com/images/LusBsMjSW6OOcTeA2QuA5VroCs.jpg?width=928&height=448",
  },
  {
    id: "telescope-stars",
    title: "A Telescope, Pointed at the Stars",
    description:
      "We believe mechanistic understanding is the foundation for entirely new architectures, capabilities, and safety tools.",
    category: "ANNOUNCEMENT",
    date: "08.10.2025",
    link: "https://blog.tilderesearch.com/blog/telescope-stars",
    image: "https://framerusercontent.com/images/DsG5Vic9pEDlzisLhNX77Vn5N8.jpg?width=928&height=448",
  },
  {
    id: "momoe",
    title: "MoMoE: Memory-optimized Mixture of Experts",
    description:
      "Mixture-of-Experts (MoE) architectures scale model parameter counts efficiently by activating only a fraction of weights per token.",
    category: "TECHNICAL RELEASE",
    date: "07.25.2025",
    link: "https://blog.tilderesearch.com/blog/momoe",
    image: "https://framerusercontent.com/images/EgdfsSZ644sdgfraW38b4BhR0uw.jpg?width=928&height=448",
  },
  {
    id: "sparsity",
    title: "Sparsity is Cool",
    description:
      "Sparse attention models offer a compelling balance between accuracy and computational cost across sequence lengths.",
    category: "VIGNETTE",
    date: "07.12.2025",
    link: "https://blog.tilderesearch.com/vignettes/sparsity",
    image: "https://framerusercontent.com/images/62VQHM7LQCCnSXY6wAvoJPtwo.jpg?width=928&height=448",
  },
  {
    id: "activault",
    title: "Activault: Scalable, Efficient, and Fast",
    description:
      "Activault stores activation caches in high-throughput NVMe tiers for ultra-fast multi-node interpretability evaluations.",
    category: "TECHNICAL RELEASE",
    date: "06.29.2025",
    link: "https://blog.tilderesearch.com/blog/activault",
    image: "https://framerusercontent.com/images/7gWu9J0alwdZWLOQBETiJod7cww.jpg?width=928&height=448",
  },
  {
    id: "sieve",
    title: "Sieve: SAEs Beat Baselines on a Real-World Task",
    description:
      "Sparse Autoencoders (SAEs) decompose dense residual streams into human-interpretable feature vectors that surpass hand-tuned heuristics.",
    category: "VIGNETTE",
    date: "06.15.2025",
    link: "https://blog.tilderesearch.com/vignettes/sieve",
    image: "https://framerusercontent.com/images/waa58l80BvQ7XLQweDLlzBrba8.jpg?width=928&height=448",
  },
  {
    id: "rate-distortion",
    title: "The Rate Distortion Dance of Sparse Autoencoders",
    description:
      "We quantify the optimal trade-off frontier between sparsity L0 and reconstruction loss across transformer attention heads.",
    category: "TECHNICAL RELEASE",
    date: "05.30.2025",
    link: "https://blog.tilderesearch.com/blog/rate-distortion",
    image: "https://framerusercontent.com/images/J5DJ15FqIexBnuhPvJ2736Aso.jpg?width=928&height=448",
  },
];
