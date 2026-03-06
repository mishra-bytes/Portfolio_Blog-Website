export function UpsideDownVines() {
  return (
    <div
      aria-hidden="true"
      className="vine-layer pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <svg
        viewBox="0 0 220 320"
        className="vine-svg absolute -left-10 -top-8 h-[18rem] w-[14rem] md:h-[22rem] md:w-[16rem]"
      >
        <path
          className="vine-main"
          d="M18 12C44 44 58 87 70 122C84 167 102 210 126 242C149 272 177 292 204 314"
        />
        <path
          className="vine-main"
          d="M72 122C49 138 40 164 41 196C43 230 34 254 18 278"
        />
        <path
          className="vine-glow"
          d="M130 236C118 224 104 210 94 194"
        />
      </svg>
      <svg
        viewBox="0 0 220 320"
        className="vine-svg absolute -right-12 -top-10 h-[20rem] w-[14rem] rotate-[12deg] md:h-[24rem] md:w-[16rem]"
      >
        <path
          className="vine-main"
          d="M18 12C44 44 58 87 70 122C84 167 102 210 126 242C149 272 177 292 204 314"
        />
        <path
          className="vine-main"
          d="M126 242C144 218 165 205 192 200C204 198 213 193 220 184"
        />
        <path
          className="vine-glow"
          d="M64 114C84 140 95 156 108 188"
        />
      </svg>
      <svg
        viewBox="0 0 220 320"
        className="vine-svg absolute -bottom-14 -left-12 h-[20rem] w-[15rem] -rotate-[18deg] md:h-[24rem] md:w-[18rem]"
      >
        <path
          className="vine-main"
          d="M18 12C44 44 58 87 70 122C84 167 102 210 126 242C149 272 177 292 204 314"
        />
        <path
          className="vine-main"
          d="M126 244C118 216 99 194 72 186C51 180 34 170 16 152"
        />
        <path
          className="vine-glow"
          d="M78 178C92 198 102 214 116 226"
        />
      </svg>
      <svg
        viewBox="0 0 220 320"
        className="vine-svg absolute -bottom-16 -right-8 h-[18rem] w-[14rem] rotate-[168deg] md:h-[22rem] md:w-[16rem]"
      >
        <path
          className="vine-main"
          d="M18 12C44 44 58 87 70 122C84 167 102 210 126 242C149 272 177 292 204 314"
        />
        <path
          className="vine-main"
          d="M74 124C96 136 108 154 118 178C128 201 145 218 171 230"
        />
        <path
          className="vine-glow"
          d="M132 208C151 222 170 233 190 242"
        />
      </svg>
    </div>
  );
}
