import { GlobalConfig } from "../../../GlobalConfig";
import { Transform } from "../../hierarchy_object/Transform";
import { CssRenderer, CssRendererConst } from "./CssRenderer";
import { CssFilter } from "./filter/CssFilter";

export enum CssSpriteAtlasRenderMode {
    ObjectFit,
    ClipPath
}

export class CssSpriteAtlasRenderer extends CssRenderer<HTMLImageElement> {
    private _renderMode: CssSpriteAtlasRenderMode = CssSpriteAtlasRenderMode.ObjectFit;
    private _imageWidth = 0;
    private _imageHeight = 0;
    private _imageFlipX = false;
    private _imageFlipY = false;
    private _opacity = 1;
    
    private readonly onFilterUpdate = (): void => {
        if (this.htmlElement) {
            this.htmlElement.style.filter = this._filter.toString();
        }
    };
    
    private readonly _filter: CssFilter = new CssFilter(this.onFilterUpdate);

    private _rowCount = 1;
    private _columnCount = 1;
    private _currentImageIndex = 0;
    
    // used for object-fit
    private _croppedImageWidth = 0;
    private _croppedImageHeight = 0;
    
    private _initializeFunction: (() => void)|null = null;

    protected override renderInitialize(): void {
        if (this._initializeFunction) {
            this._initializeFunction();
        } else {
            this.asyncSetImageFromPath(GlobalConfig.defaultSpriteSrc, 1, 1);
        }
    }

    protected override updateCenterOffset(updateTransform: boolean): void {
        if (!this.css3DObject) return;

        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            this.css3DObject.position.set(
                this._imageWidth * this.centerOffset.x,
                this._imageHeight * this.centerOffset.y, 0
            );
                
            if (updateTransform) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            }
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
            const columnIndex = this._currentImageIndex % this._columnCount;
            const rowIndex = Math.floor(this._currentImageIndex / this._columnCount);

            const columnScalar = this._imageFlipX 
                ? -(this._imageWidth * this._columnCount / 2 - this._imageWidth / 2) + columnIndex * this._imageWidth
                : (this._imageWidth * this._columnCount / 2 - this._imageWidth / 2) - columnIndex * this._imageWidth;

            const rowScalar = this._imageFlipY
                ? (this._imageHeight * this._rowCount / 2 - this._imageHeight / 2) - rowIndex * this._imageHeight
                : -(this._imageHeight * this._rowCount / 2 - this._imageHeight / 2) + rowIndex * this._imageHeight;

            this.css3DObject.position.set(
                this._imageWidth * this.centerOffset.x + columnScalar,
                this._imageHeight * this.centerOffset.y + rowScalar,
                0
            );
                
            if (updateTransform) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            }
        }
    }

    protected override updateViewScale(updateTransform: boolean): void {
        if (!this.css3DObject) return;
        
        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            const value = this.viewScale;
            //const image = this.htmlElement!;
            
            //image.style.width = (this._croppedImageWidth / value) + "px";
            //image.style.height = (this._croppedImageHeight / value) + "px";
            const xScalar = this._imageFlipX ? -1 : 1;
            const yScalar = this._imageFlipY ? -1 : 1;
            this.css3DObject.scale.set(
                this._imageWidth / this._croppedImageWidth * value * xScalar,
                this._imageHeight / this._croppedImageHeight * value * yScalar,
                1
            );

            if (updateTransform) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            }
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {   
            const value = this.viewScale;
            const image = this.htmlElement!;
            
            image.style.width = (this._imageWidth * this._columnCount / value) + "px";
            image.style.height = (this._imageHeight * this._rowCount / value) + "px";
            const xScalar = this._imageFlipX ? -1 : 1;
            const yScalar = this._imageFlipY ? -1 : 1;
            this.css3DObject.scale.set(
                value * xScalar,
                value * yScalar,
                value
            );

            if (updateTransform) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            }
        }
    }

    private updateImageIndex(): void {
        if (!this.htmlElement) return;

        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            const width = -(this._currentImageIndex % this._columnCount * this._croppedImageWidth);
            const height = -Math.floor(this._currentImageIndex / this._columnCount) * this._croppedImageHeight;
            this.htmlElement.style.objectPosition = width + "px " + height + "px";
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
            const rowIndex = Math.floor(this._currentImageIndex / this._columnCount);
            const columnIndex = this._columnCount - this._currentImageIndex % this._columnCount - 1;
            this.htmlElement.style.clipPath = 
                "inset(" + 
                (100 / this._rowCount * rowIndex) + "% " +
                (100 / this._columnCount * columnIndex) + "% " +
                (100 - ((100 / this._rowCount * rowIndex) + (100 / this._rowCount))) + "% " +
                (100 - ((100 / this._columnCount * columnIndex) + (100 / this._columnCount))) + "%)";
        }
    }

    public get image(): HTMLImageElement|null {
        return this.htmlElement;
    }

    public asyncSetImageFromPath(path: string, rowCount: number, columnCount: number, onComplete?: () => void): void {
        if (!this.readyToDraw) {
            this._initializeFunction = (): void => this.asyncSetImageFromPath(path, rowCount, columnCount, onComplete);
            return;
        }

        const image = this.htmlElement ?? new Image();
        image.src = path;

        const onLoad = (_e: Event): void => {
            if (!this.exists) return;
            image.removeEventListener("load", onLoad);
            this.setImage(image, rowCount, columnCount);
            onComplete?.();
        };
        image.addEventListener("load", onLoad);
    }

    public setImage(image: HTMLImageElement, rowCount: number, columnCount: number): void {
        if (!image.complete) throw new Error(`Image {${image.src}} is not loaded.`);

        this._rowCount = rowCount;
        this._columnCount = columnCount;
        this.htmlElement = image;

        image.alt = this.gameObject.name + "_sprite_atlas";
        image.style.imageRendering = "pixelated";
        image.style.opacity = this._opacity.toString();
        image.style.filter = this._filter.toString();
        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            if (this.viewScale !== 1) {
                console.warn("CssSpriteAtlas.viewScale is not supported in CssSpriteAtlasRenderMode.ObjectFit, for supressing this warning set viewScale to 1.");
            }
            this._croppedImageWidth = image.naturalWidth / this._columnCount;
            this._croppedImageHeight = image.naturalHeight / this._rowCount;
            if (this._imageWidth === 0) this._imageWidth = this._croppedImageWidth * CssRendererConst.LengthUnitScalar;
            if (this._imageHeight === 0) this._imageHeight = this._croppedImageHeight * CssRendererConst.LengthUnitScalar;
            image.style.width = (this._croppedImageWidth/* / this.viewScale*/) + "px";
            image.style.height = (this._croppedImageHeight/* / this.viewScale*/) + "px";
            image.style.objectFit = "none";
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
            if (this._imageWidth === 0) this._imageWidth = image.naturalWidth / this._columnCount * CssRendererConst.LengthUnitScalar;
            if (this._imageHeight === 0) this._imageHeight = image.naturalHeight / this._rowCount * CssRendererConst.LengthUnitScalar;
            image.style.width = (this._imageWidth * this._columnCount / this.viewScale) + "px";
            image.style.height = (this._imageHeight * this._rowCount / this.viewScale) + "px";
        }
        const css3DObject = this.initializeBaseComponents(false);
        this.updateImageIndex();
        Transform.updateRawObject3DWorldMatrixRecursively(css3DObject);
        this.transform.enqueueRenderAttachedObject3D(css3DObject);
    }

    public get renderMode(): CssSpriteAtlasRenderMode {
        return this._renderMode;
    }

    public set renderMode(value: CssSpriteAtlasRenderMode) {
        if (this._renderMode === value) return;
        this._renderMode = value;

        if (this.htmlElement) {
            const image = this.htmlElement;
            if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
                if (this.viewScale !== 1) {
                    console.warn("CssSpriteAtlas.viewScale is not supported in CssSpriteAtlasRenderMode.ObjectFit");
                }
                image.style.clipPath = "";

                this._croppedImageWidth = image.naturalWidth / this._columnCount;
                this._croppedImageHeight = image.naturalHeight / this._rowCount;
                if (this._imageWidth === 0) this._imageWidth = this._croppedImageWidth;
                if (this._imageHeight === 0) this._imageHeight = this._croppedImageHeight;
                image.style.width = (this._croppedImageWidth/* / this.viewScale*/) + "px";
                image.style.height = (this._croppedImageHeight/* / this.viewScale*/) + "px";
                image.style.objectFit = "none";
            } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
                image.style.objectFit = "";
                image.style.objectPosition = "";

                if (this._imageWidth === 0) this._imageWidth = image.naturalWidth / this._columnCount;
                if (this._imageHeight === 0) this._imageHeight = image.naturalHeight / this._rowCount;
                image.style.width = (this._imageWidth * this._columnCount / this.viewScale) + "px";
                image.style.height = (this._imageHeight * this._rowCount / this.viewScale) + "px";
            }
            this.updateViewScale(false);
            this.updateCenterOffset(false);
            this.updateImageIndex();
            Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject!);
            this.transform.enqueueRenderAttachedObject3D(this.css3DObject!);
        }
    }

    public get imageIndex(): number {
        return this._currentImageIndex;
    }

    public set imageIndex(value: number) {
        this._currentImageIndex = value;
        this.updateImageIndex();
        if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) {
            this.updateCenterOffset(true);
        }
    }

    public get rowCount(): number {
        return this._rowCount;
    }

    public get columnCount(): number {
        return this._columnCount;
    }

    public get imageWidth(): number {
        return this._imageWidth;
    }

    public set imageWidth(value: number) {
        this._imageWidth = value;
        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            if (this.css3DObject) {
                //this.htmlElement!.style.width = (this._croppedImageWidth / this.viewScale) + "px";
                this.css3DObject.scale.x = this._imageWidth / this._croppedImageWidth * this.viewScale;
                this.css3DObject.scale.x *= this._imageFlipX ? -1 : 1;
            }
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
            if (this.htmlElement) {
                this.htmlElement.style.width = value * this._columnCount / this.viewScale + "px";
            }
        }
        this.updateCenterOffset(true);
    }

    public get imageHeight(): number {
        return this._imageHeight;
    }

    public set imageHeight(value: number) {
        this._imageHeight = value;
        if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
            if (this.css3DObject) {
                //this.htmlElement!.style.height = (this._croppedImageHeight / this.viewScale) + "px";
                this.css3DObject.scale.y = this._imageHeight / this._croppedImageHeight * this.viewScale;
                this.css3DObject.scale.y *= this._imageFlipY ? -1 : 1;
            }
        } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
            if (this.htmlElement) {
                this.htmlElement.style.height = value * this._rowCount / this.viewScale + "px";
            }
        }
        this.updateCenterOffset(true);
    }

    public get imageFlipX(): boolean {
        return this._imageFlipX;
    }

    public set imageFlipX(value: boolean) {
        this._imageFlipX = value;
        if (this.css3DObject) {
            if (this._imageFlipX) {
                if (0 < this.css3DObject.scale.x) {
                    this.css3DObject.scale.x *= -1;
                }
            } else {
                if (this.css3DObject.scale.x < 0) {
                    this.css3DObject.scale.x *= -1;
                }
            }
            if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
                this.updateImageIndex();
                this.updateCenterOffset(true);
            }
        }
    }

    public get imageFlipY(): boolean {
        return this._imageFlipY;
    }

    public set imageFlipY(value: boolean) {
        this._imageFlipY = value;
        if (this.css3DObject) {
            if (this._imageFlipY) {
                if (0 < this.css3DObject.scale.y) {
                    this.css3DObject.scale.y *= -1;
                }
            } else {
                if (this.css3DObject.scale.y < 0) {
                    this.css3DObject.scale.y *= -1;
                }
            }
            if (this._renderMode === CssSpriteAtlasRenderMode.ObjectFit) {
                Transform.updateRawObject3DWorldMatrixRecursively(this.css3DObject);
                this.transform.enqueueRenderAttachedObject3D(this.css3DObject);
            } else /* if (this._renderMode === CssSpriteAtlasRenderMode.ClipPath) */ {
                this.updateImageIndex();
                this.updateCenterOffset(true);
            }
        }
    }

    public get opacity(): number {
        return this._opacity;
    }

    public set opacity(value: number) {
        this._opacity = value;
        if (this.htmlElement) {
            this.htmlElement.style.opacity = this._opacity.toString();
        }
    }
    
    public get filter(): CssFilter {
        return this._filter;
    }
}
