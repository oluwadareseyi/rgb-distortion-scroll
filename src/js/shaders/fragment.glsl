uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uAlpha;

varying vec2 vUv;

// vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
//    float r = texture2D(textureImage,uv + offset).r;
//    vec2 gb = texture2D(textureImage,uv).gb;
//    return vec3(r,gb);
//  }

void main () {

    vec4 color = texture2D(uTexture, vUv);

    color.r = texture2D(uTexture, vUv + uOffset).r;

    gl_FragColor = color;
    // gl_FragColor = vec4(1.0 , 1.0, 1.0, 1.0);
}