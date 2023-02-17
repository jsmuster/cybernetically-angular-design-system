import { Component, OnChanges, 
  OnInit, AfterViewInit,
  ElementRef, 
  ChangeDetectorRef, 
  SimpleChanges,
  Input,Output,
  ViewContainerRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'cy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonComponent implements OnInit, OnChanges {
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    public _elementRef: ElementRef
  )
  {
    
  }

  @ViewChild('button', {static: false}) button!: ElementRef;
  @ViewChild('buttonLabel', {static: false}) buttonLabel!: ElementRef;

  /* this method checks to see that all inputs were provided for this component */
  private assertInputsProvided(): void {
    if (!this.button) {
      throw (new Error("The required input [button] was not provided"));
    }
  }

  private initAttributesProvided(): void {
    /* determine the size attribute */
    if(this._size == 'default')
    {
      if(this.hasHostAttribute('small'))
      {
        this._size = 'small';
      }
      else if(this.hasHostAttribute('medium'))
      {
        this._size = 'medium';
      }
      else if(this.hasHostAttribute('large'))
      {
        this._size = 'large';
      }
      else
      {
        this._size = 'large';
      }
    }

    /* determine the corners */
    if(this._corners == 'default')
    {
      if(this.hasHostAttribute('rounded'))
      {
        this._corners = 'rounded';
      }
      else if(this.hasHostAttribute('square'))
      {
        this._corners = 'square';
      }
      else
      {
        this._corners = 'rounded';
      }
    }

    /* determine the corners */
    if(this._type == 'default')
    {
      if(this.hasHostAttribute('icon'))
      {
        this._type = 'icon';
      }
      else
      {
        this._type = 'default';
      }
    }

    // 'default' | 'hover' | 'pressed' | 'selected' | 'disabled' | 'focus';
    /* determine the state based on attributes */
    if(this._uistate == 'default')
    {
      if(this.hasHostAttribute('hover'))
      {
        this._uistate = 'hover';
      }
      else if(this.hasHostAttribute('pressed'))
      {
        this._uistate = 'pressed';
      }
      else if(this.hasHostAttribute('selected'))
      {
        this._uistate = 'selected';
      }
      else if(this.hasHostAttribute('disabled'))
      {
        this._uistate = 'disabled';
      }
      else if(this.hasHostAttribute('focus'))
      {
        this._uistate = 'focus';
      }
      else
      {
        this._uistate = 'default';
      }
    }
  }

  private hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
  }

  private hasHostAttribute(attribute: string) {
    return this._elementRef.nativeElement.hasAttribute(attribute);
  }

  /* On Init Hook */
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this.assertInputsProvided();
    
    this.initAttributesProvided();
    
  }
  /* On Changes Hook */
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  /* After View Initializes Hook */
  ngAfterViewInit(): void {

  }

  @Output('click') onCyClickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output('on.click') onClickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  /* On Click Event Generator */
  onClickEventHandler($event: MouseEvent): void
  {
    //console.log("On Cy Button Click", $event);

    this.onCyClickEvent.emit($event);
    this.onClickEvent.emit($event);

    $event.stopPropagation();
  }

  //#region "UIState"
  @Input()
  get uistate(): string { return this._size; }
  set uistate(value: string)
  {
    this.handleChangeState(value);
  }
  
  private handleChangeState(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      if(value == 'hover')
      {
        this._uistate = 'hover';
      }
      else if(value == 'pressed')
      {
        this._uistate = 'pressed';
      }
      else if(value == 'selected')
      {
        this._uistate = 'selected';
      }
      else if(value == 'disabled')
      {
        this._uistate = 'disabled';
      }
      else if(value == 'focus')
      {
        this._uistate = 'focus';
      }
      else
      {
        this._uistate = 'default';
      }
      
      this.onStateChanged.emit(value);
    }
  }
   
  @Output('on.state') onStateChanged: EventEmitter<string> = new EventEmitter<string>();

  protected _uistate: ButtonState = 'default';
  //#endregion "UIState"

  //#region "Size"
  @Input()
  get size(): string { return this._size; }
  set size(value: string)
  {
    this.handleChangeSize(value);
  }
  
  private handleChangeSize(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      if(value == 'small')
      {
        this._size = 'small';
      }
      else if(value == 'medium')
      {
        this._size = 'medium';
      }
      else if(value == 'large')
      {
        this._size = 'large';
      }
      else
      {
        this._size = 'large';
      }
      
      this.onSizeChanged.emit(value);
    }
  }
   
  @Output('on.size') onSizeChanged: EventEmitter<string> = new EventEmitter<string>();

  protected _size: ButtonSize = 'default';
  //#endregion "Size"

  //#region "Type"
  @Input()
  get type(): string { return this._size; }
  set type(value: string)
  {
    this.handleChangeType(value);
  }
  
  private handleChangeType(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      if(value == 'icon')
      {
        this._type = 'icon';
      }
      else
      {
        this._type = 'default';
      }
      
      this.onSizeChanged.emit(value);
    }
  }

  protected _type: ButtonType = 'default';
  //#endregion "Type"

  //#region "Orientation"
  @Input()
  get orientation(): string { return this._size; }
  set orientation(value: string)
  {
    this.handleChangeOrientation(value);
  }
  
  private handleChangeOrientation(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      if(value == 'vertical')
      {
        this._orientation = 'vertical';
      }
      else
      {
        this._orientation = 'horizontal';
      }
      
      this.onOrientationChanged.emit(value);
    }
  }
   
  @Output('on.orientation') onOrientationChanged: EventEmitter<string> = new EventEmitter<string>();

  protected _orientation: ButtonOrientation = 'horizontal';
  //#endregion "Orientation"

  //#region "Corners"
  @Input()
  get corners(): string { return this._size; }
  set corners(value: string)
  {
    this.handleChangeCorners(value);
  }
  
  private handleChangeCorners(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      if(value == 'rounded')
      {
        this._corners = 'rounded';
      }
      else
      {
        this._corners = 'square';
      }
      
      this.onCornersChanged.emit(value);
    }
  }
   
  @Output('on.corners') onCornersChanged: EventEmitter<string> = new EventEmitter<string>();

  protected _corners: ButtonCorners = 'square';
  //#endregion "Corners"
  
  //#region "Icon"
  @Input()
  get icon(): string { return this._icon; }
  set icon(value: string)
  {
    this.handleChangeIcon(value);
  }

  private _icon: any = null;

  /* Change icon value handler */
  private handleChangeIcon(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      this._icon = value;
      this.onIconChanged.emit(value);
    }
  }

  @Output('on.icon') onIconChanged: EventEmitter<string> = new EventEmitter<string>();
  //#endregion "Icon"

  //#region "Label"
  @Input()
  get label(): string { return this._label; }
  set label(value: string)
  {
    this.handleChangeLabel(value);
  } 

  private handleChangeLabel(value: string)
  {
    if(value != null && typeof(value) == 'string')
    {
      this._label = value;
      this.onLabelChanged.emit(value);
    }
  }
     
  @Output('on.label') onLabelChanged: EventEmitter<string> = new EventEmitter<string>();

  protected _label: string = '';
  //#endregion "Label"
}

export type ButtonState = 'default' | 'hover' | 'pressed' | 'selected' | 'disabled' | 'focus';

export type ButtonSize = 'default' | 'small' | 'medium' | 'large';

export type ButtonOrientation = 'horizontal' | 'vertical';

export type ButtonCorners = 'default' | 'rounded' | 'square';

export type ButtonType = 'default' | 'icon';