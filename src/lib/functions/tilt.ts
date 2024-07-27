import VanillaTilt, { type TiltOptions } from "vanilla-tilt"

export function tilt(node: HTMLDivElement, options: TiltOptions) {
    VanillaTilt.init(node, options)
}