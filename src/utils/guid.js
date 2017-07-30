// From http://stackoverflow.com/a/24891600/109306
const trueRandom = (() => {
	// From http://baagoe.com/en/RandomMusings/javascript/
	// Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010
	function Mash() {
		let n = 0xefc8249d;

		const mash = (data) => {
			data = data.toString();
			for (let i = 0; i < data.length; i++) {
				n += data.charCodeAt(i);
				let h = 0.02519603282416938 * n;
				n = h >>> 0;
				h -= n;
				h *= n;
				n = h >>> 0;
				h -= n;
				n += h * 0x100000000; // 2^32
			}
			return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
		};

		mash.version = "Mash 0.9";
		return mash;
	}

	// From http://baagoe.com/en/RandomMusings/javascript/
	function alea(...parentArgs) {
		return ((args) => {
			// Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010
			let s0 = 0;
			let s1 = 0;
			let s2 = 0;
			let c = 1;

			if (args.length === 0) {
				args = [+new Date()];
			}
			let mash = new Mash();
			s0 = mash(" ");
			s1 = mash(" ");
			s2 = mash(" ");

			for (let i = 0; i < args.length; i++) {
				s0 -= mash(args[i]);
				if (s0 < 0) {
					s0 += 1;
				}
				s1 -= mash(args[i]);
				if (s1 < 0) {
					s1 += 1;
				}
				s2 -= mash(args[i]);
				if (s2 < 0) {
					s2 += 1;
				}
			}
			mash = null;

			const random = () => {
				const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
				s0 = s1;
				s1 = s2;
				c = t | 0;
				s2 = t - c;
				return s2;
			};
			random.uint32 = () => random() * 0x100000000; // 2^32
			random.fract53 = () => random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
			random.version = "Alea 0.9";
			random.args = args;
			return random;
		})(parentArgs);
	};

	return alea();
})();

module.exports = () =>
	"xxxxxxxxxxxx4xxxyxxxxxxx".replace(/[xy]/g, (c) => {
		const r = trueRandom() * 16 | 0;
		const v = c === "x" ? r : r & 0x3 | 0x8;

		return v.toString(16);
	});
