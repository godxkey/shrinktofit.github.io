System.register("chunks:///_virtual/Constants.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      cclegacy._RF.push({}, "051ddCIZstMKJ9X/ysk0rOG", "Constants", undefined);

      var FORWARD = exports('FORWARD', math.Vec3.UNIT_Z);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SoftSkin.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Mesh, Node, Skeleton, Material, gfx, utils, MeshRenderer, Component, assert, math, warn, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, _createForOfIteratorHelper;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Mesh = module.Mesh;
      Node = module.Node;
      Skeleton = module.Skeleton;
      Material = module.Material;
      gfx = module.gfx;
      utils = module.utils;
      MeshRenderer = module.MeshRenderer;
      Component = module.Component;
      assert = module.assert;
      math = module.math;
      warn = module.warn;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
      _createForOfIteratorHelper = module.createForOfIteratorHelper;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "17b1an0hfFMKaWnTcK1MJgs", "SoftSkin", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SoftSkin = exports('SoftSkin', (_dec = ccclass('SoftSkin'), _dec2 = property(Mesh), _dec3 = property(Node), _dec4 = property(Skeleton), _dec5 = property(Material), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inherits(SoftSkin, _Component);

        var _super = _createSuper(SoftSkin);

        function SoftSkin() {
          var _this;

          _classCallCheck(this, SoftSkin);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "mesh", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "skinningRoot", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "skeleton", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "material", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "renderParent", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_skinners", []);

          return _this;
        }

        _createClass(SoftSkin, [{
          key: "start",
          value: function start() {
            this._convertSkinnedMeshRenderer(this);
          }
        }, {
          key: "update",
          value: function update(_deltaTime) {
            var _iterator = _createForOfIteratorHelper(this._skinners),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var skinner = _step.value;
                skinner.update();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }, {
          key: "_convertSkinnedMeshRenderer",
          value: function _convertSkinnedMeshRenderer(_ref) {
            var _this$renderParent;

            var mesh = _ref.mesh,
                skeleton = _ref.skeleton,
                skinningRoot = _ref.skinningRoot,
                material = _ref.material;
            var renderParent = (_this$renderParent = this.renderParent) !== null && _this$renderParent !== void 0 ? _this$renderParent : this.node;

            for (var iPrimitive = 0; iPrimitive < mesh.struct.primitives.length; ++iPrimitive) {
              var primitive = mesh.struct.primitives[iPrimitive];
              var positionElements = mesh.readAttribute(iPrimitive, gfx.AttributeName.ATTR_POSITION);
              var jointIndices = mesh.readAttribute(iPrimitive, gfx.AttributeName.ATTR_JOINTS);
              var weights = mesh.readAttribute(iPrimitive, gfx.AttributeName.ATTR_WEIGHTS);

              if (!positionElements || !jointIndices || !weights) {
                continue;
              }

              var normals = mesh.readAttribute(iPrimitive, gfx.AttributeName.ATTR_NORMAL);
              var nVertices = positionElements.length / 3;
              asserts(Number.isInteger(nVertices));
              asserts(nVertices * 3 === positionElements.length);
              asserts(nVertices * 4 === jointIndices.length);
              asserts(nVertices * 4 === weights.length);

              if (normals) {
                asserts(nVertices * 3 === normals.length);
              }

              var colors = colorArrayFromFlatted(new Array(4 * nVertices).fill(255.0));
              var indices = mesh.readIndices(iPrimitive);
              var softRenderedPrimitive = utils.createMesh({
                primitiveMode: primitive.primitiveMode,
                positions: Array.from(positionElements),
                indices: indices ? Array.from(indices) : undefined // normals: normals ? Array.from(normals) : undefined,
                // colors: flatColorArray(colors),

              });
              var displayNode = new Node();
              renderParent.addChild(displayNode);
              var meshRenderer = displayNode.addComponent(MeshRenderer);
              meshRenderer.mesh = softRenderedPrimitive;

              if (material) {
                meshRenderer.material = material;
              }

              var skinner = new Skinner(nVertices, vec3ArrayFromFlatted(positionElements), normals ? vec3ArrayFromFlatted(normals) : undefined, jointIndices, weights, skeleton, skinningRoot, softRenderedPrimitive.renderingSubMeshes);

              this._skinners.push(skinner);
            }
          }
        }]);

        return SoftSkin;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skinningRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "renderParent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      function asserts(expr) {
        assert(expr);
      }

      function vec3ArrayFromFlatted(elements) {
        var result = new Array(elements.length / 3);

        for (var iVec3 = 0; iVec3 < result.length; ++iVec3) {
          result[iVec3] = new math.Vec3(elements[3 * iVec3 + 0], elements[3 * iVec3 + 1], elements[3 * iVec3 + 2]);
        }

        return result;
      }

      function colorArrayFromFlatted(elements) {
        var result = new Array(elements.length / 4);

        for (var iColor = 0; iColor < result.length; ++iColor) {
          result[iColor] = new math.Color(elements[4 * iColor + 0], elements[4 * iColor + 1], elements[4 * iColor + 2], elements[4 * iColor + 3]);
        }

        return result;
      }

      var Skinner = /*#__PURE__*/function () {
        function Skinner(nVertices, vertexPositions, vertexNormals, vertexJoints, vertexWeights, skeleton, skinningRoot, renderResult) {
          var _this2 = this;

          _classCallCheck(this, Skinner);

          _defineProperty(this, "_nVertices", void 0);

          _defineProperty(this, "_vertexPositions", void 0);

          _defineProperty(this, "_vertexNormals", void 0);

          _defineProperty(this, "_vertexWeights", void 0);

          _defineProperty(this, "_vertexJoints", void 0);

          _defineProperty(this, "_skinnedPositions", void 0);

          _defineProperty(this, "_skinnedNormals", void 0);

          _defineProperty(this, "_inverseBindMatrices", void 0);

          _defineProperty(this, "_jointNodes", void 0);

          _defineProperty(this, "_jointMatrices", void 0);

          _defineProperty(this, "_renderResult", void 0);

          this._nVertices = nVertices;
          this._vertexPositions = vertexPositions;
          this._vertexNormals = vertexNormals;
          this._vertexJoints = vertexJoints;
          this._vertexWeights = vertexWeights;
          this._jointMatrices = skeleton.joints.map(function () {
            return new math.Mat4();
          });
          this._inverseBindMatrices = skeleton.inverseBindposes;
          this._jointNodes = skeleton.joints.map(function (jointPath, iJoint) {
            var jointNode = skinningRoot.getChildByPath(jointPath);

            if (jointNode) {
              return jointNode;
            } else {
              warn("Cannot find joint: ".concat(jointPath));

              _this2._jointMatrices[iJoint].set(skeleton.inverseBindposes[iJoint]);

              return null;
            }
          });
          this._renderResult = renderResult;
          this._skinnedPositions = new Float32Array(3 * nVertices);
          this._skinnedNormals = new Float32Array(3 * nVertices);
          var vertexBundles = [{
            view: {
              offset: 0,
              length: this._skinnedPositions.byteLength,
              count: nVertices,
              stride: 3 * this._skinnedPositions.byteLength
            },
            attributes: [new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F, false, 0, false, 0)]
          }];
          var meshStructure = {
            vertexBundles: vertexBundles,
            primitives: [{
              primitiveMode: gfx.PrimitiveMode.TRIANGLE_LIST,
              vertexBundelIndices: new Array(vertexBundles.length).fill(0).map(function (_, i) {
                return i;
              })
            }]
          };
          var mesh = new Mesh();
          mesh.reset({
            struct: meshStructure,
            data: new Uint8Array(this._skinnedPositions.buffer)
          });
        }

        _createClass(Skinner, [{
          key: "update",
          value: function update() {
            this._updateJoints();

            this._updateVertices();

            this._updateRenderData();
          }
        }, {
          key: "_updateJoints",
          value: function _updateJoints() {
            var _this3 = this;

            this._jointNodes.forEach(function (jointNode, jointIndex) {
              var inverseBindMatrix = _this3._inverseBindMatrices[jointIndex];

              if (jointNode) {
                math.Mat4.multiply(_this3._jointMatrices[jointIndex], jointNode.getWorldMatrix(), inverseBindMatrix);
              }
            });
          }
        }, {
          key: "_updateVertices",
          value: function _updateVertices() {
            var sumMatrix = new math.Mat4();
            var v3 = new math.Vec3();
            var nVertices = this._nVertices,
                weights = this._vertexWeights,
                jointIndices = this._vertexJoints,
                skinnedPositions = this._skinnedPositions,
                skinnedNormals = this._skinnedNormals,
                jointMatrices = this._jointMatrices,
                vertexPositions = this._vertexPositions,
                vertexNormals = this._vertexNormals;

            for (var iVertex = 0; iVertex < nVertices; ++iVertex) {
              sumMatrix.zero();

              for (var iInfluenceElement = 0; iInfluenceElement < 4; ++iInfluenceElement) {
                var influenceIndex = 4 * iVertex + iInfluenceElement;
                var weight = weights[influenceIndex];

                if (!weight) {
                  continue;
                }

                var jointIndex = jointIndices[influenceIndex];
                var jointMatrix = jointMatrices[jointIndex];
                math.Mat4.multiplyScalarAndAdd(sumMatrix, sumMatrix, jointMatrix, weight);
              }

              v3.set(vertexPositions[iVertex]);
              var skinnedPosition = v3;
              math.Vec3.transformMat4(skinnedPosition, skinnedPosition, sumMatrix);
              math.Vec3.toArray(skinnedPositions, skinnedPosition, 3 * iVertex);

              if (vertexNormals) {
                v3.set(vertexNormals[iVertex]);
                var skinnedNormal = v3;
                math.Vec3.transformMat4Normal(skinnedNormal, skinnedNormal, sumMatrix);
                math.Vec3.toArray(skinnedNormals, skinnedPosition, 3 * iVertex);
              }
            }
          }
        }, {
          key: "_updateRenderData",
          value: function _updateRenderData() {
            var renderResult = this._renderResult;

            var _iterator2 = _createForOfIteratorHelper(renderResult),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var renderingSubMesh = _step2.value;

                var _iterator3 = _createForOfIteratorHelper(renderingSubMesh.attributes),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var attribute = _step3.value;

                    switch (attribute.name) {
                      case gfx.AttributeName.ATTR_POSITION:
                        {
                          var vertexBuffer = renderingSubMesh.vertexBuffers[attribute.stream];
                          vertexBuffer.update(this._skinnedPositions);
                          break;
                        }

                      case gfx.AttributeName.ATTR_NORMAL:
                        break;
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }]);

        return Skinner;
      }();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkeletonRenderer.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './OctahedralBone.ts', './SkeletonUtils.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Material, Skeleton, Node, utils, MeshRenderer, Vec3, Quat, Component, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, _createForOfIteratorHelper, createOctahedralBone, skeletonToNodes;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      Skeleton = module.Skeleton;
      Node = module.Node;
      utils = module.utils;
      MeshRenderer = module.MeshRenderer;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
      _createForOfIteratorHelper = module.createForOfIteratorHelper;
    }, function (module) {
      createOctahedralBone = module.createOctahedralBone;
    }, function (module) {
      skeletonToNodes = module.skeletonToNodes;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "1c60abAe1pIeps58uwH6z+e", "SkeletonRenderer", undefined);

      var SkeletonRenderer = exports('SkeletonRenderer', (_dec = _decorator.ccclass, _dec2 = _decorator.property(Material), _dec3 = _decorator.property(Skeleton), _dec4 = _decorator.property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inherits(SkeletonRenderer, _Component);

        var _super = _createSuper(SkeletonRenderer);

        function SkeletonRenderer() {
          var _this;

          _classCallCheck(this, SkeletonRenderer);

          _this = _super.call(this);

          _initializerDefineProperty(_assertThisInitialized(_this), "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "skeleton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "skeletonParent", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_anyJointTransformChanged", true);

          _defineProperty(_assertThisInitialized(_this), "_boneRenderings", []);

          _defineProperty(_assertThisInitialized(_this), "_boneMesh", void 0);

          _defineProperty(_assertThisInitialized(_this), "_rootNodes", []);

          var boneGeometry = createOctahedralBone({
            width: 0.1,
            length: 0.1
          });
          _this._boneMesh = utils.createMesh(boneGeometry);
          return _this;
        }

        _createClass(SkeletonRenderer, [{
          key: "setRootNodesFromSkeleton",
          value: function setRootNodesFromSkeleton(skeleton) {
            var _this$skeletonParent;

            var skeletonParent = (_this$skeletonParent = this.skeletonParent) !== null && _this$skeletonParent !== void 0 ? _this$skeletonParent : this.node.scene;
            var rootJointNodes = skeletonToNodes(skeleton);

            var _iterator = _createForOfIteratorHelper(rootJointNodes),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var rootJointNode = _step.value;
                skeletonParent.addChild(rootJointNode);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            this._rootNodes = rootJointNodes;
          }
        }, {
          key: "start",
          value: function start() {
            if (this.skeleton) {
              this.setRootNodesFromSkeleton(this.skeleton);
            }

            var rootJointNodes = this._rootNodes;

            var _iterator2 = _createForOfIteratorHelper(rootJointNodes),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var rootNode = _step2.value;

                this._recursiveAddBoneRenderings(rootNode);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            var _iterator3 = _createForOfIteratorHelper(rootJointNodes),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _rootNode = _step3.value;

                this._watchJointTransformChangeEvent(_rootNode);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }, {
          key: "update",
          value: function update() {
            if (this._anyJointTransformChanged) {
              this._anyJointTransformChanged = false;

              this._updateSkeletonRendering();
            }
          }
        }, {
          key: "_watchJointTransformChangeEvent",
          value: function _watchJointTransformChangeEvent(node) {
            node.on(Node.EventType.TRANSFORM_CHANGED, this._onAnyJointTransformChanged, this);

            var _iterator4 = _createForOfIteratorHelper(node.children),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var child = _step4.value;

                this._watchJointTransformChangeEvent(child);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }, {
          key: "_onAnyJointTransformChanged",
          value: function _onAnyJointTransformChanged() {
            this._anyJointTransformChanged = true;
          }
        }, {
          key: "_updateSkeletonRendering",
          value: function _updateSkeletonRendering() {
            var _iterator5 = _createForOfIteratorHelper(this._boneRenderings),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var boneRendering = _step5.value;

                this._updateBone(boneRendering);
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        }, {
          key: "_recursiveAddBoneRenderings",
          value: function _recursiveAddBoneRenderings(parentJoint) {
            var _iterator6 = _createForOfIteratorHelper(parentJoint.children),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var child = _step6.value;

                this._addBoneRendering(parentJoint, child);

                this._recursiveAddBoneRenderings(child);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        }, {
          key: "_addBoneRendering",
          value: function _addBoneRendering(parentJoint, childJoint) {
            var renderingNode = new Node();
            renderingNode.name = "".concat(parentJoint.name, "-").concat(childJoint.name);
            this.node.addChild(renderingNode);
            var boneMeshRenderer = renderingNode.addComponent(MeshRenderer);
            boneMeshRenderer.material = this.material;
            boneMeshRenderer.mesh = this._boneMesh;
            var boneRendering = {
              parentJoint: parentJoint,
              childJoint: childJoint,
              renderingNode: renderingNode
            };

            this._boneRenderings.push(boneRendering);
          }
        }, {
          key: "_updateBone",
          value: function _updateBone(boneRendering) {
            var parentJoint = boneRendering.parentJoint,
                childJoint = boneRendering.childJoint;
            var fromPos = parentJoint.getWorldPosition();
            var toPos = childJoint.getWorldPosition();
            var dir = Vec3.subtract(new Vec3(), toPos, fromPos);
            var dirLen = Vec3.len(dir);
            Vec3.normalize(dir, dir);
            var rot = Quat.rotationTo(new Quat(), Vec3.UNIT_Y, dir);
            boneRendering.renderingNode.setRTS(rot, fromPos, new Vec3(dirLen, dirLen, dirLen));
          }
        }]);

        return SkeletonRenderer;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skeletonParent", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstPersonCamera.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, math, systemEvent, SystemEventType, EventMouse, Component, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, _slicedToArray;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      math = module.math;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      EventMouse = module.EventMouse;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
      _slicedToArray = module.slicedToArray;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "4611ad+FVZACpT24ZEFwUrf", "FirstPersonCamera", undefined);

      var FirstPersonCamera = exports('FirstPersonCamera', (_dec = _decorator.ccclass('FirstPersonCamera'), _dec2 = _decorator.property, _dec3 = _decorator.property, _dec4 = _decorator.property, _dec5 = _decorator.property, _dec6 = _decorator.property, _dec7 = _decorator.property, _dec8 = _decorator.property, _dec9 = _decorator.property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
        _inherits(FirstPersonCamera, _cc$Component);

        var _super = _createSuper(FirstPersonCamera);

        function FirstPersonCamera() {
          var _this;

          _classCallCheck(this, FirstPersonCamera);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "initialDistance", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "initialHorizonRotation", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "initialVerticalRotation", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "horizonRotationSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "verticalRotationSpeed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mouseWheelSpeed", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "touchZoomSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_currentDir", math.Vec3.negate(new math.Vec3(), math.Vec3.UNIT_Z));

          _defineProperty(_assertThisInitialized(_this), "_distance", 0.0);

          _defineProperty(_assertThisInitialized(_this), "_mouseButtonPressing", {
            left: false,
            right: false,
            middle: false
          });

          _defineProperty(_assertThisInitialized(_this), "_previousTwoTouchDistance", 0.0);

          return _this;
        }

        _createClass(FirstPersonCamera, [{
          key: "start",
          value: function start() {
            this._distance = this.initialDistance;

            this._zoom(this._distance);

            this._rotateHorizon(this.initialHorizonRotation);

            this._rotateVertical(this.initialVerticalRotation);

            systemEvent.on(SystemEventType.MOUSE_DOWN, this._onMouseDown, this);
            systemEvent.on(SystemEventType.MOUSE_MOVE, this._onMouseMove, this);
            systemEvent.on(SystemEventType.MOUSE_UP, this._onMouseUp, this);
            systemEvent.on(SystemEventType.MOUSE_WHEEL, this._onMouseWheel, this);
            systemEvent.on(SystemEventType.TOUCH_START, this._onTouchBegin, this);
            systemEvent.on(SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
            systemEvent.on(SystemEventType.TOUCH_END, this._onTouchEnd, this);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            systemEvent.off(SystemEventType.MOUSE_DOWN, this._onMouseDown, this);
            systemEvent.off(SystemEventType.MOUSE_MOVE, this._onMouseMove, this);
            systemEvent.off(SystemEventType.MOUSE_UP, this._onMouseUp, this);
            systemEvent.off(SystemEventType.MOUSE_WHEEL, this._onMouseWheel, this);
          }
        }, {
          key: "update",
          value: function update(_deltaTime) {
            var position = new math.Vec3();
            var rotation = new math.Quat();

            this._calcTransform(this.target.worldPosition, position, rotation);

            this.node.position = position;
            this.node.rotation = rotation;
          }
        }, {
          key: "_calcTransform",
          value: function _calcTransform(targetPosition, outPosition, outRotation) {
            var dir = math.Vec3.normalize(new math.Vec3(), this._currentDir);
            math.Quat.fromViewUp(outRotation, dir, math.Vec3.UNIT_Y);
            math.Vec3.add(outPosition, targetPosition, this._currentDir);
          }
        }, {
          key: "_onMouseDown",
          value: function _onMouseDown(event) {
            switch (event.getButton()) {
              default:
                break;

              case EventMouse.BUTTON_LEFT:
                this._mouseButtonPressing.left = true;
                break;

              case EventMouse.BUTTON_RIGHT:
                this._mouseButtonPressing.right = true;
                break;

              case EventMouse.BUTTON_MIDDLE:
                this._mouseButtonPressing.middle = true;
                break;
            }
          }
        }, {
          key: "_onMouseMove",
          value: function _onMouseMove(event) {
            if (this._mouseButtonPressing.right) {
              var dx = event.getDeltaX();

              if (dx) {
                var angle = -dx * this.horizonRotationSpeed;

                this._rotateHorizon(angle);
              }

              var dy = event.getDeltaY();

              if (dy) {
                var _angle = -dy * this.verticalRotationSpeed;

                this._rotateVertical(_angle);
              }
            }
          }
        }, {
          key: "_onMouseUp",
          value: function _onMouseUp(event) {
            switch (event.getButton()) {
              default:
                break;

              case EventMouse.BUTTON_LEFT:
                this._mouseButtonPressing.left = false;
                break;

              case EventMouse.BUTTON_RIGHT:
                this._mouseButtonPressing.right = false;
                break;

              case EventMouse.BUTTON_MIDDLE:
                this._mouseButtonPressing.middle = false;
                break;
            }
          }
        }, {
          key: "_onMouseWheel",
          value: function _onMouseWheel(event) {
            var deltaZoom = -this.mouseWheelSpeed * event.getScrollY();

            this._zoomDelta(deltaZoom);
          }
        }, {
          key: "_onTouchBegin",
          value: function _onTouchBegin(touch, eventTouch) {
            var allTouches = eventTouch.getAllTouches();

            switch (allTouches.length) {
              default:
                break;

              case 2:
                {
                  var _allTouches = _slicedToArray(allTouches, 2),
                      touch1 = _allTouches[0],
                      touch2 = _allTouches[1];

                  this._previousTwoTouchDistance = math.Vec2.distance(touch1.getLocation(), touch2.getLocation());
                  break;
                }
            }
          }
        }, {
          key: "_onTouchMove",
          value: function _onTouchMove(touch, eventTouch) {
            var allTouches = eventTouch.getAllTouches();

            switch (allTouches.length) {
              default:
                break;

              case 1:
                {
                  var delta = touch.getDelta();
                  var dx = delta.x;

                  if (dx) {
                    var angle = -dx * this.horizonRotationSpeed;

                    this._rotateHorizon(angle);
                  }

                  var dy = delta.y;

                  if (dy) {
                    var _angle2 = -dy * this.verticalRotationSpeed;

                    this._rotateVertical(_angle2);
                  }

                  break;
                }

              case 2:
                {
                  var _allTouches2 = _slicedToArray(allTouches, 2),
                      touch1 = _allTouches2[0],
                      touch2 = _allTouches2[1];

                  var distance = math.Vec2.distance(touch1.getLocation(), touch2.getLocation());
                  var dDistance = distance - this._previousTwoTouchDistance;
                  this._previousTwoTouchDistance = distance;

                  if (dDistance !== 0) {
                    var deltaZoom = -this.touchZoomSpeed * dDistance;

                    this._zoomDelta(deltaZoom);
                  }

                  break;
                }
            }
          }
        }, {
          key: "_onTouchEnd",
          value: function _onTouchEnd(touch) {}
        }, {
          key: "_zoom",
          value: function _zoom(distance) {
            math.Vec3.normalize(this._currentDir, this._currentDir);
            math.Vec3.multiplyScalar(this._currentDir, this._currentDir, distance);
          }
        }, {
          key: "_zoomDelta",
          value: function _zoomDelta(delta) {
            var currentLen = math.Vec3.len(this._currentDir);
            var len = currentLen + delta;

            this._zoom(len);
          }
        }, {
          key: "_rotateHorizon",
          value: function _rotateHorizon(angle) {
            var q = math.Quat.fromAxisAngle(new math.Quat(), math.Vec3.UNIT_Y, math.toRadian(angle));
            math.Vec3.transformQuat(this._currentDir, this._currentDir, q);
          }
        }, {
          key: "_rotateVertical",
          value: function _rotateVertical(angle) {
            var currentDirNorm = math.Vec3.normalize(new math.Vec3(), this._currentDir);
            var up = math.Vec3.UNIT_Y;
            var axis = math.Vec3.cross(new math.Vec3(), currentDirNorm, up);
            math.Vec3.normalize(axis, axis);
            var currentAngle = math.toDegree(math.Vec3.angle(currentDirNorm, up));
            var DISABLE_FLIP_DELTA = 1e-2;
            var clampedAngle = currentAngle - math.clamp(currentAngle - angle, 0.0 + DISABLE_FLIP_DELTA, 180.0 - DISABLE_FLIP_DELTA);
            var q = math.Quat.fromAxisAngle(new math.Quat(), axis, math.toRadian(clampedAngle));
            math.Vec3.transformQuat(this._currentDir, this._currentDir, q);
          }
        }]);

        return FirstPersonCamera;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "initialDistance", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialHorizonRotation", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "initialVerticalRotation", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 45.0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "horizonRotationSpeed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "verticalRotationSpeed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "mouseWheelSpeed", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "touchZoomSpeed", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Joystick.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, math, UITransform, error, Node, Component, _inherits, _createSuper, _classCallCheck, _defineProperty, _assertThisInitialized, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      UITransform = module.UITransform;
      error = module.error;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "514872+M0FEkpPvxZ4koEY6", "Joystick", undefined);

      var Joystick = exports('Joystick', (_dec = _decorator.ccclass, _dec(_class = (_temp = /*#__PURE__*/function (_cc$Component) {
        _inherits(Joystick, _cc$Component);

        var _super = _createSuper(Joystick);

        function Joystick() {
          var _this;

          _classCallCheck(this, Joystick);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _defineProperty(_assertThisInitialized(_this), "backgroundRadius", 40);

          _defineProperty(_assertThisInitialized(_this), "_pressing", false);

          _defineProperty(_assertThisInitialized(_this), "_direction", new math.Vec2());

          return _this;
        }

        _createClass(Joystick, [{
          key: "pressing",
          get: function get() {
            return this._pressing;
          }
        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          }
        }, {
          key: "start",
          value: function start() {
            var uiTransform = this.getComponent(UITransform);

            if (!uiTransform) {
              error("Missing component UITransform");
              return;
            }

            this._uiTransform = uiTransform;
            var bar = this.node.getChildByName('Bar');

            if (!bar) {
              error("Missing node Bar");
              return;
            }

            this._bar = bar;
            var background = this.node.getChildByName('Background');

            if (!background) {
              error("Missing node Background");
              return;
            }

            this._background = background;
            this._originalPositionBar = this._bar.getPosition(new math.Vec3());
            this._originalPositionBackground = this._background.getPosition(new math.Vec3());
            this.node.on(Node.EventType.TOUCH_START, this._onThisNodeTouchStart, this);
            this.node.on(Node.EventType.TOUCH_END, this._onThisNodeTouchEnd, this);
            this.node.on(Node.EventType.TOUCH_CANCEL, this._onThisNodeTouchCancelled, this);
            this.node.on(Node.EventType.TOUCH_MOVE, this._onThisNodeTouchMove, this);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            this.node.off(Node.EventType.TOUCH_START, this._onThisNodeTouchStart, this);
            this.node.off(Node.EventType.TOUCH_END, this._onThisNodeTouchEnd, this);
            this.node.off(Node.EventType.TOUCH_CANCEL, this._onThisNodeTouchCancelled, this);
            this.node.off(Node.EventType.TOUCH_MOVE, this._onThisNodeTouchMove, this);
          }
        }, {
          key: "update",
          value: function update(deltaTime) {}
        }, {
          key: "_onThisNodeTouchStart",
          value: function _onThisNodeTouchStart(touchEvent) {
            var touch = touchEvent.touch;

            if (!touch) {
              return;
            }

            var localPosition = this._uiTransform.convertToNodeSpaceAR(new math.Vec3(touch.getUILocationX(), touch.getUILocationY(), 0.0), new math.Vec3());

            this._bar.setPosition(localPosition);

            this._background.setPosition(localPosition);

            this._pressing = true;
          }
        }, {
          key: "_onThisNodeTouchEnd",
          value: function _onThisNodeTouchEnd() {
            this._bar.setPosition(this._originalPositionBar);

            this._background.setPosition(this._originalPositionBackground);

            this._pressing = false;
          }
        }, {
          key: "_onThisNodeTouchCancelled",
          value: function _onThisNodeTouchCancelled() {
            this._onThisNodeTouchEnd();
          }
        }, {
          key: "_onThisNodeTouchMove",
          value: function _onThisNodeTouchMove(touchEvent) {
            var touch = touchEvent.touch;

            if (!touch) {
              return;
            }

            var backgroundPosition = this._background.getPosition();

            var delta2D = touch.getDelta();
            var delta = new math.Vec3(delta2D.x, delta2D.y);

            var barPosition = this._bar.getPosition(new math.Vec3());

            math.Vec3.add(barPosition, barPosition, delta);

            var _clampCircular = clampCircular(barPosition.x, barPosition.y, backgroundPosition.x, backgroundPosition.y, this.backgroundRadius),
                x = _clampCircular.x,
                y = _clampCircular.y;

            math.Vec3.set(barPosition, x, y, barPosition.z);

            this._bar.setPosition(barPosition);

            var dir3D = math.Vec3.subtract(new math.Vec3(), barPosition, backgroundPosition);
            math.Vec3.normalize(dir3D, dir3D);
            math.Vec2.set(this._direction, dir3D.x, dir3D.y);
            console.log("Move ".concat(delta));
          }
        }]);

        return Joystick;
      }(Component), _temp)) || _class));

      function clampCircular(x, y, centerX, centerY, radius) {
        var center = new math.Vec2(centerX, centerY);
        var dir = new math.Vec2(x, y);
        math.Vec2.subtract(dir, dir, center);
        var distance = math.Vec2.len(dir);
        var clampedDistance = math.clamp(distance, 0, radius);
        math.Vec2.normalize(dir, dir);
        math.Vec2.scaleAndAdd(dir, center, dir, clampedDistance);
        return {
          x: dir.x,
          y: dir.y
        };
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodeUtils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      exports('getForward', getForward);

      cclegacy._RF.push({}, "515647kfExD1aO/WixEPOQk", "NodeUtils", undefined);

      function getForward(node) {
        return math.Vec3.transformQuat(new math.Vec3(), math.Vec3.UNIT_Z, node.worldRotation);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MmoController.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './Joystick.ts', './NodeUtils.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, math, systemEvent, SystemEventType, Component, macro, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, Joystick, getForward;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
      macro = module.macro;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      Joystick = module.Joystick;
    }, function (module) {
      getForward = module.getForward;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "56a76ttylZOa6v5IQHAXgVt", "MmoController", undefined);

      var MmoController = exports('MmoController', (_dec = _decorator.ccclass, _dec2 = _decorator.property, _dec3 = _decorator.property, _dec4 = _decorator.property(Joystick), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
        _inherits(MmoController, _cc$Component);

        var _super = _createSuper(MmoController);

        function MmoController() {
          var _this;

          _classCallCheck(this, MmoController);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "moveSpeed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rotationSpeed", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "joystick", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_keyPressed", {
            w: false,
            a: false,
            s: false,
            d: false,
            q: false,
            e: false
          });

          return _this;
        }

        _createClass(MmoController, [{
          key: "start",
          value: function start() {
            systemEvent.on(SystemEventType.KEY_DOWN, this._onKeyDown, this);
            systemEvent.on(SystemEventType.KEY_UP, this._onKeyUp, this);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            systemEvent.off(SystemEventType.KEY_DOWN, this._onKeyDown, this);
            systemEvent.off(SystemEventType.TOUCH_MOVE, this._onKeyUp, this);
          }
        }, {
          key: "update",
          value: function update(deltaTime) {
            var joyStick = this.joystick;

            if (joyStick && joyStick.pressing) {
              var forward = getForward(this.node);
              var currentDir = new math.Vec3(forward.x, 0.0, forward.z);
              var joyStickDir = new math.Vec3(-joyStick.direction.x, 0.0, joyStick.direction.y);

              if (!math.Vec3.equals(joyStickDir, math.Vec3.ZERO)) {
                var angle = math.Vec3.angle(joyStickDir, currentDir);
                var clampedAngle = math.clamp(angle, 0, math.toRadian(this.rotationSpeed * deltaTime));
                var axis = math.Vec3.cross(new math.Vec3(), math.Vec3.normalize(new math.Vec3(), currentDir), joyStickDir);
                math.Vec3.normalize(axis, axis);
                var q = math.Quat.fromAxisAngle(new math.Quat(), axis, clampedAngle);
                var rotation = math.Quat.multiply(q, q, this.node.rotation);
                this.node.rotation = rotation;
                {
                  var _position = this.node.position;

                  var _forward = getForward(this.node);

                  var newPosition = math.Vec3.scaleAndAdd(new math.Vec3(), _position, _forward, deltaTime * this.moveSpeed);
                  this.node.setPosition(newPosition);
                }
              }
            }

            var rotationQuantity = (this._keyPressed.a ? 1 : 0) + (this._keyPressed.d ? -1 : 0);

            if (rotationQuantity) {
              var rotationDelta = this.rotationSpeed * deltaTime * rotationQuantity;
              var up = math.Vec3.UNIT_Y;

              var _q = math.Quat.fromAxisAngle(new math.Quat(), up, math.toRadian(rotationDelta));

              var _rotation = math.Quat.multiply(_q, _q, this.node.rotation);

              this.node.rotation = _rotation;
            }

            var dir = new math.Vec3();

            if (this._keyPressed.w) {
              math.Vec3.add(dir, dir, math.Vec3.UNIT_Z);
            }

            if (this._keyPressed.s) {
              math.Vec3.add(dir, dir, NEG_UNIT_Z);
            }

            if (this._keyPressed.q) {
              math.Vec3.add(dir, dir, math.Vec3.UNIT_X);
            }

            if (this._keyPressed.e) {
              math.Vec3.add(dir, dir, NEG_UNIT_X);
            }

            math.Vec3.multiplyScalar(dir, dir, this.moveSpeed * deltaTime);
            math.Vec3.transformQuat(dir, dir, this.node.rotation);
            var position = math.Vec3.add(dir, this.node.position, dir);
            this.node.position = position;
          }
        }, {
          key: "_onKeyDown",
          value: function _onKeyDown(event) {
            var keyName = keyCodeToKeyName(event.keyCode);

            if (!keyName) {
              return;
            }

            if (keyName in this._keyPressed) {
              this._keyPressed[keyName] = true;
            }
          }
        }, {
          key: "_onKeyUp",
          value: function _onKeyUp(event) {
            var keyName = keyCodeToKeyName(event.keyCode);

            if (!keyName) {
              return;
            }

            if (keyName in this._keyPressed) {
              this._keyPressed[keyName] = false;
            }
          }
        }]);

        return MmoController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 180.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "joystick", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      var NEG_UNIT_X = math.Vec3.negate(new math.Vec3(), math.Vec3.UNIT_X);
      var NEG_UNIT_Y = math.Vec3.negate(new math.Vec3(), math.Vec3.UNIT_Y);
      var NEG_UNIT_Z = math.Vec3.negate(new math.Vec3(), math.Vec3.UNIT_Z);

      function keyCodeToKeyName(keyCode) {
        var _MAP;

        var MAP = (_MAP = {}, _defineProperty(_MAP, macro.KEY.w, 'w'), _defineProperty(_MAP, macro.KEY.a, 'a'), _defineProperty(_MAP, macro.KEY.s, 's'), _defineProperty(_MAP, macro.KEY.d, 'd'), _defineProperty(_MAP, macro.KEY.q, 'q'), _defineProperty(_MAP, macro.KEY.e, 'e'), _MAP);
        return keyCode in MAP ? MAP[keyCode] : '';
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MixamoAnimationRetargeting.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './SoftSkin.ts', './SkeletonUtils.ts', './SkeletonRenderer.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, AnimationClip, Skeleton, AnimationComponent, SkinnedMeshRenderer, Animation, Component, math, animation, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, _createForOfIteratorHelper, SoftSkin, getLocalBindPoses, SkeletonRenderer;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AnimationClip = module.AnimationClip;
      Skeleton = module.Skeleton;
      AnimationComponent = module.AnimationComponent;
      SkinnedMeshRenderer = module.SkinnedMeshRenderer;
      Animation = module.Animation;
      Component = module.Component;
      math = module.math;
      animation = module.animation;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
      _createForOfIteratorHelper = module.createForOfIteratorHelper;
    }, function (module) {
      SoftSkin = module.SoftSkin;
    }, function (module) {
      getLocalBindPoses = module.getLocalBindPoses;
    }, function (module) {
      SkeletonRenderer = module.SkeletonRenderer;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "62f51ZcZFhNzaC+rS8q+95T", "MixamoAnimationRetargeting", undefined);

      var MixamoAnimationRetargeting = exports('MixamoAnimationRetargeting', (_dec = _decorator.ccclass('MixamoAnimationRetargeting'), _dec2 = _decorator.property([AnimationClip]), _dec3 = _decorator.property(AnimationClip), _dec4 = _decorator.property, _dec5 = _decorator.property(Skeleton), _dec6 = _decorator.property(Skeleton), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
        _inherits(MixamoAnimationRetargeting, _cc$Component);

        var _super = _createSuper(MixamoAnimationRetargeting);

        function MixamoAnimationRetargeting() {
          var _this;

          _classCallCheck(this, MixamoAnimationRetargeting);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "clips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "defaultClip", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rootName", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sourceSkeleton", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "targetSkeleton", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "postfix", '_Armature');

          return _this;
        }

        _createClass(MixamoAnimationRetargeting, [{
          key: "start",
          value: function start() {
            var animationComponent = this.node.getComponent(AnimationComponent);

            if (!animationComponent) {
              return;
            }

            var root = this.node.getChildByPath(this.rootName);

            if (!root) {
              return;
            }

            var path = [];
            var node = root;

            while (node !== null && node !== this.node) {
              path.unshift(node.name);
              node = node.parent;
            }

            var prefix = path.join('/') + '/';
            var mapping = new SkeletonMapping(prefix, this.postfix);

            var _iterator = _createForOfIteratorHelper(this.clips),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var clip = _step.value;
                retargetAnimation(clip, mapping);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            animationComponent.clips = animationComponent.clips.concat(this.clips);
            animationComponent.defaultClip = this.defaultClip;
            var newSkeleton = retargetJoints(this.sourceSkeleton, this.targetSkeleton, mapping);
            newSkeleton.name = "Retargeted skeleton"; // const copyRenderer = copySkinnedMeshRenderer(skinnedMeshRenderer);
            // copyRenderer.skeleton = newSkeleton;
            // skinnedMeshRenderer.enabled = false;

            var _iterator2 = _createForOfIteratorHelper(this.node.getComponentsInChildren(SkinnedMeshRenderer)),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var skinnedMeshRenderer = _step2.value;
                skinnedMeshRenderer.skeleton = newSkeleton;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            var retargetedSkeletonRenderNode = this.node.scene.getChildByName('RetargetedSkeletonDebugging');
            var retargetedSkeletonRenderer = retargetedSkeletonRenderNode.getComponentInChildren(SkeletonRenderer); // retargetedSkeletonRenderer.skeleton = newSkeleton;

            retargetedSkeletonRenderer.setRootNodesFromSkeleton(newSkeleton);

            var _iterator3 = _createForOfIteratorHelper(retargetedSkeletonRenderNode.getComponentsInChildren(SoftSkin)),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var skinRenderer = _step3.value;
                skinRenderer.skeleton = newSkeleton;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            retargetedSkeletonRenderNode.getComponentInChildren(Animation).defaultClip = this.defaultClip;
          }
        }]);

        return MixamoAnimationRetargeting;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "defaultClip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rootName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sourceSkeleton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "targetSkeleton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      function retargetJoints(sourceSkeleton, targetSkeleton, mapping) {
        var sourceLocalBindPoses = getLocalBindPoses(sourceSkeleton);
        var sourceInverseBindPoses = sourceSkeleton.bindposes;
        var targetLocalBindPoses = getLocalBindPoses(targetSkeleton);
        var targetInverseBindPoses = targetSkeleton.bindposes;
        var targetToSourceMapping = new Array(targetSkeleton.joints.length).fill(-1);
        sourceSkeleton.joints.forEach(function (sourceJointPath, sourceJointIndex) {
          var mappedJointPath = mapping.get(sourceJointPath);

          if (!mappedJointPath) {
            console.warn("Source joint ".concat(sourceJointPath, " is not mapped."));
            return;
          }

          var targetJointIndex = targetSkeleton.joints.indexOf(mappedJointPath);

          if (!targetJointIndex) {
            console.warn("Source joint ".concat(sourceJointPath, " is not mapped into target skeleton."));
            return;
          }

          targetToSourceMapping[targetJointIndex] = sourceJointIndex;
        });
        var nonMappedTargetJoints = targetToSourceMapping.map(function (_, index) {
          return index;
        }).filter(function (index) {
          return targetToSourceMapping[index] < 0;
        });

        if (nonMappedTargetJoints.length !== 0) {
          console.warn("The following joints in target skeleton are not mapped:\n" + "".concat(nonMappedTargetJoints.map(function (index) {
            return targetSkeleton.joints[index].split('/').pop();
          }).join('\n')));
        }

        var newBindPoseMatrices = Array.from({
          length: targetSkeleton.joints.length
        }, function () {
          return new math.Mat4();
        });

        for (var iTargetJoint = 0; iTargetJoint < targetSkeleton.joints.length; ++iTargetJoint) {
          var targetJointIndex = iTargetJoint;
          var sourceJointIndex = targetToSourceMapping[iTargetJoint];

          if (sourceJointIndex < 0) {
            continue;
          }

          var newBindPoseLocal = newBindPoseMatrices[targetJointIndex];
          var sourceLocalBindPose = sourceLocalBindPoses[sourceJointIndex];
          var sourceInverseBindPose = sourceInverseBindPoses[sourceJointIndex];
          var sourceLocalInverseBindPose = math.Mat4.invert(new math.Mat4(), sourceInverseBindPose);
          var targetLocalBindPose = targetLocalBindPoses[targetJointIndex];
          var targetLocalInverseBindPose = math.Mat4.invert(new math.Mat4(), targetLocalBindPose);
          var targetInverseBindPose = targetInverseBindPoses[targetJointIndex];
          var sourceLocalRotation = sourceLocalBindPose.getRotation(new math.Quat());
          var sourceLocalScale = sourceLocalBindPose.getScale(new math.Vec3());
          var sourceLocalTranslation = sourceLocalBindPose.getTranslation(new math.Vec3());
          var targetLocalTranslation = targetLocalBindPose.getTranslation(new math.Vec3()); // Enter source joint space

          math.Mat4.multiply(newBindPoseLocal, newBindPoseLocal, sourceLocalBindPose); // Cancel target joint space

          math.Mat4.multiply(newBindPoseLocal, newBindPoseLocal, targetLocalInverseBindPose); // Mesh space -> Target joint space

          math.Mat4.multiply(newBindPoseLocal, newBindPoseLocal, targetInverseBindPose); //const targetJointParentIndex = getParentJoint(targetSkeleton, targetJointIndex);
          // const retargetedTranslation = cc.math.Vec3.clone(targetLocalTranslation);
          // const retargetedRotation = sourceLocalRotation;
          // const retargetedScale = sourceLocalScale;
          // cc.math.Vec3.multiplyScalar(retargetedTranslation, retargetedTranslation, 0.001);
          // cc.math.Vec3.multiply(retargetedTranslation, retargetedTranslation, sourceLocalScale);
          // const retargetedLocalBindPose = cc.math.Mat4.fromRTS(new cc.math.Mat4(), retargetedRotation, retargetedTranslation, retargetedScale);
          // cc.math.Mat4.copy(newBindPoseLocal, retargetedLocalBindPose);
          // cc.math.Mat4.multiply(newBindPoseLocal, newBindPoseLocal, targetInverseBindPose);
          // Verify we get no problem with local-world bind pose transformation
          // cc.math.Mat4.copy(newBindPoseLocal, targetLocalBindPose);
          // cc.math.Mat4.copy(newBindPoseLocal, targetLocalBindPose);
        } // localBindPosesToWorld(targetSkeleton, newBindPoseMatrices);
        // for (const bindPose of newBindPoseMatrices) {
        //     cc.math.Mat4.invert(bindPose, bindPose);
        // }


        var newSkeleton = new Skeleton();
        newSkeleton.joints = targetSkeleton.joints.slice();
        newSkeleton.bindposes = newBindPoseMatrices;
        return newSkeleton;
      }

      function retargetAnimation(clip, mapping) {
        var _iterator5 = _createForOfIteratorHelper(clip.tracks),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var track = _step5.value;
            var path = track.path;

            if (path.length === 0) {
              continue;
            }

            var hierarchyPath = path[0];

            if (!(hierarchyPath instanceof animation.HierarchyPath)) {
              continue;
            }

            var mapped = mapping.get(hierarchyPath.path);

            if (mapped) {
              hierarchyPath.path = mapped;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      var SkeletonMapping = /*#__PURE__*/function () {
        function SkeletonMapping(prefix, postfix) {
          _classCallCheck(this, SkeletonMapping);

          _defineProperty(this, "_prefix", void 0);

          _defineProperty(this, "_postfix", void 0);

          this._prefix = prefix;
          this._postfix = postfix;
        }

        _createClass(SkeletonMapping, [{
          key: "get",
          value: function get(source) {
            var prefix = this._prefix,
                postfix = this._postfix;
            var mapped = "".concat(prefix).concat(source.split('/').map(function (s) {
              return "".concat(s).concat(postfix);
            }).join('/'));
            return mapped;
          }
        }]);

        return SkeletonMapping;
      }();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ThirdPersonCamera.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, math, macro, systemEvent, SystemEvent, game, Component, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      macro = module.macro;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      game = module.game;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "65e46jJEo9C+r7M4LECzFMl", "ThirdPersonCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Vec2 = math.Vec2,
          Vec3 = math.Vec3,
          Quat = math.Quat;
      var v2_1 = new Vec2();
      var v2_2 = new Vec2();
      var v3_1 = new Vec3();
      var qt_1 = new Quat();
      var KEYCODE = {
        W: 'W'.charCodeAt(0),
        S: 'S'.charCodeAt(0),
        A: 'A'.charCodeAt(0),
        D: 'D'.charCodeAt(0),
        Q: 'Q'.charCodeAt(0),
        E: 'E'.charCodeAt(0),
        SHIFT: macro.KEY.shift
      };
      var ThirdPersonCamera = exports('ThirdPersonCamera', (_dec = ccclass('ThirdPersonCamera'), _dec2 = property({
        slide: true,
        range: [0.05, 0.5, 0.01]
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inherits(ThirdPersonCamera, _Component);

        var _super = _createSuper(ThirdPersonCamera);

        function ThirdPersonCamera() {
          var _this;

          _classCallCheck(this, ThirdPersonCamera);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "moveSpeed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "moveSpeedShiftScale", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "damp", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_euler", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_velocity", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_position", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_speedScale", 1);

          return _this;
        }

        _createClass(ThirdPersonCamera, [{
          key: "onLoad",
          value: function onLoad() {
            systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
            systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
            systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
            systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
            Vec3.copy(this._euler, this.node.eulerAngles);
            Vec3.copy(this._position, this.node.position);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            systemEvent.off(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
            systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
            systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
            systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          }
        }, {
          key: "update",
          value: function update(dt) {
            // position
            Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
            Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
            Vec3.lerp(v3_1, this.node.position, this._position, dt / this.damp);
            this.node.setPosition(v3_1); // rotation

            Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
            Quat.slerp(qt_1, this.node.rotation, qt_1, dt / this.damp);
            this.node.setRotation(qt_1);
          }
        }, {
          key: "onMouseWheel",
          value: function onMouseWheel(e) {
            var delta = -e.getScrollY() * this.moveSpeed * 0.1; // delta is positive when scroll down

            Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
            Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
          }
        }, {
          key: "onKeyDown",
          value: function onKeyDown(e) {
            var v = this._velocity;

            if (e.keyCode === KEYCODE.SHIFT) {
              this._speedScale = this.moveSpeedShiftScale;
            } else if (e.keyCode === KEYCODE.W) {
              if (v.z === 0) {
                v.z = -1;
              }
            } else if (e.keyCode === KEYCODE.S) {
              if (v.z === 0) {
                v.z = 1;
              }
            } else if (e.keyCode === KEYCODE.A) {
              if (v.x === 0) {
                v.x = -1;
              }
            } else if (e.keyCode === KEYCODE.D) {
              if (v.x === 0) {
                v.x = 1;
              }
            } else if (e.keyCode === KEYCODE.Q) {
              if (v.y === 0) {
                v.y = -1;
              }
            } else if (e.keyCode === KEYCODE.E) {
              if (v.y === 0) {
                v.y = 1;
              }
            }
          }
        }, {
          key: "onKeyUp",
          value: function onKeyUp(e) {
            var v = this._velocity;

            if (e.keyCode === KEYCODE.SHIFT) {
              this._speedScale = 1;
            } else if (e.keyCode === KEYCODE.W) {
              if (v.z < 0) {
                v.z = 0;
              }
            } else if (e.keyCode === KEYCODE.S) {
              if (v.z > 0) {
                v.z = 0;
              }
            } else if (e.keyCode === KEYCODE.A) {
              if (v.x < 0) {
                v.x = 0;
              }
            } else if (e.keyCode === KEYCODE.D) {
              if (v.x > 0) {
                v.x = 0;
              }
            } else if (e.keyCode === KEYCODE.Q) {
              if (v.y < 0) {
                v.y = 0;
              }
            } else if (e.keyCode === KEYCODE.E) {
              if (v.y > 0) {
                v.y = 0;
              }
            }
          }
        }, {
          key: "onTouchStart",
          value: function onTouchStart() {
            if (game.canvas['requestPointerLock']) {
              game.canvas.requestPointerLock();
            }
          }
        }, {
          key: "onTouchMove",
          value: function onTouchMove(t, e) {
            e.getStartLocation(v2_1);

            if (v2_1.x > game.canvas.width * 0.4) {
              // rotation
              e.getDelta(v2_2);
              this._euler.y -= v2_2.x * this.rotateSpeed * 0.1;
              this._euler.x += v2_2.y * this.rotateSpeed * 0.1;
            } else {
              // position
              e.getLocation(v2_2);
              Vec2.subtract(v2_2, v2_2, v2_1);
              this._velocity.x = v2_2.x * 0.01;
              this._velocity.z = -v2_2.y * 0.01;
            }
          }
        }, {
          key: "onTouchEnd",
          value: function onTouchEnd(t, e) {
            if (document.exitPointerLock) {
              document.exitPointerLock();
            }

            e.getStartLocation(v2_1);

            if (v2_1.x < game.canvas.width * 0.4) {
              // position
              this._velocity.x = 0;
              this._velocity.z = 0;
            }
          }
        }]);

        return ThirdPersonCamera;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeedShiftScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damp", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GeometryUtils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6dbb8TXuw9L7alFZSzNwebU", "GeometryUtils", undefined);

      var calculateNormals = exports('calculateNormals', function () {
        var p0 = new Vec3();
        var p1 = new Vec3();
        var p2 = new Vec3();
        var e1 = new Vec3();
        var e2 = new Vec3();
        var n = new Vec3();
        return function (positions, indices) {
          var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var nFaces = indices.length / 3;
          var nVertices = positions.length / 3;
          var normals = Array(3 * nVertices).fill(0).map(function () {
            return new Vec3();
          });

          for (var iFace = 0; iFace < nFaces; ++iFace) {
            var i0 = indices[3 * iFace + 0];
            var i1 = indices[3 * iFace + 1];
            var i2 = indices[3 * iFace + 2];
            Vec3.fromArray(p0, positions, i0 * 3);
            Vec3.fromArray(p1, positions, i1 * 3);
            Vec3.fromArray(p2, positions, i2 * 3);
            Vec3.subtract(e1, p1, p0);
            Vec3.subtract(e2, p2, p0);
            Vec3.cross(n, e1, e2);
            Vec3.add(normals[i0], normals[i0], n);
            Vec3.add(normals[i1], normals[i1], n);
            Vec3.add(normals[i2], normals[i2], n);
          }

          for (var iVertex = 0; iVertex < nVertices; ++iVertex) {
            Vec3.toArray(out, Vec3.normalize(n, normals[iVertex]), iVertex * 3);
          }

          return out;
        };
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIContentSizeOutline.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _inherits, _createSuper, _createClass, _classCallCheck;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _createClass = module.createClass;
      _classCallCheck = module.classCallCheck;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "bfd37AsoRpEcJP+YaZkWVse", "UIContentSizeOutline", undefined);

      var UIContentSizeOutline = exports('UIContentSizeOutline', (_dec = _decorator.ccclass, _dec(_class = /*#__PURE__*/function (_cc$Component) {
        _inherits(UIContentSizeOutline, _cc$Component);

        var _super = _createSuper(UIContentSizeOutline);

        function UIContentSizeOutline() {
          _classCallCheck(this, UIContentSizeOutline);

          return _super.apply(this, arguments);
        }

        _createClass(UIContentSizeOutline, [{
          key: "start",
          value: function start() {// this._graphics = this.node.addComponent(cc.Graphics);
          }
        }, {
          key: "update",
          value: function update() {// this._graphics.clear();
            // const uiTransform = this.node.getComponent(cc.UITransform);
            // if (!uiTransform) {
            //     return;
            // }
            // const { _graphics: graphics } = this;
            // const { contentSize } = uiTransform;
            // graphics.moveTo(0.0, 0.0);
            // graphics.lineTo(0.0, contentSize.y);
            // graphics.lineTo(contentSize.x, contentSize.y);
            // graphics.lineTo(contentSize.y, contentSize.x);
            // graphics.close();
            // graphics.stroke();
            // graphics.fill();
          }
        }]);

        return UIContentSizeOutline;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BillboardUi.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, Camera, math, Vec3, Component, _applyDecoratedDescriptor, _inherits, _createSuper, _classCallCheck, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Camera = module.Camera;
      math = module.math;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inherits = module.inherits;
      _createSuper = module.createSuper;
      _classCallCheck = module.classCallCheck;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "f25b2gP6A9LOLBkrBvi3Lzf", "BillboardUi", undefined);

      var BillboardUi = exports('BillboardUi', (_dec = _decorator.ccclass, _dec2 = _decorator.property(Node), _dec3 = _decorator.property(Camera), _dec4 = _decorator.property, _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
        _inherits(BillboardUi, _cc$Component);

        var _super = _createSuper(BillboardUi);

        function BillboardUi() {
          var _this;

          _classCallCheck(this, BillboardUi);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "camera", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "distance", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_lastTargetPosition", new math.Vec3());

          return _this;
        }

        _createClass(BillboardUi, [{
          key: "start",
          value: function start() {
            var targetPosition = this.target.worldPosition;
            math.Vec3.copy(this._lastTargetPosition, targetPosition);

            this._updatePosition(targetPosition);
          }
        }, {
          key: "update",
          value: function update() {
            var target = this.target,
                lastTargetPosition = this._lastTargetPosition;
            var targetPosition = target.worldPosition;

            if (Vec3.equals(targetPosition, lastTargetPosition)) {
              return;
            }

            math.Vec3.copy(lastTargetPosition, targetPosition);

            this._updatePosition(targetPosition);
          }
        }, {
          key: "_updatePosition",
          value: function _updatePosition(targetPosition) {
            var camera = this.camera;
            camera.camera.update();
            var uiPosition = camera.convertToUINode(targetPosition, this.node.parent, new math.Vec3());
            this.node.setPosition(uiPosition); // cc.math.Vec3.transformMat4(uiPosition, targetPosition, camera.camera.matView);
            // const ratio = this.distance / Math.abs(uiPosition.z);
            // const value = Math.floor(ratio * 100) / 100;
            // this.node.setScale(value, value, 1.0);
          }
        }]);

        return BillboardUi;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "distance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkeletonUtils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Node, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      math = module.math;
    }],
    execute: function () {
      exports({
        getLocalBindPoses: getLocalBindPoses,
        getParentJoint: getParentJoint,
        skeletonToNodes: skeletonToNodes
      });

      cclegacy._RF.push({}, "f6139Hm3xpBtbgZ0wBNu50o", "SkeletonUtils", undefined);

      function skeletonToNodes(skeleton) {
        var localBindPoses = getLocalBindPoses(skeleton);
        var nodes = skeleton.joints.map(function (path, index) {
          var node = new Node(path.split('/').pop());
          var position = new math.Vec3();
          var scale = new math.Vec3();
          var rotation = new math.Quat();
          math.Mat4.toRTS(localBindPoses[index], rotation, position, scale);
          node.setRTS(rotation, position, scale);
          return node;
        });
        var rootNodes = [];

        for (var iTargetJoint = 0; iTargetJoint < skeleton.joints.length; ++iTargetJoint) {
          var parentJointIndex = getParentJoint(skeleton, iTargetJoint);

          if (parentJointIndex >= 0) {
            nodes[parentJointIndex].addChild(nodes[iTargetJoint]);
          } else {
            rootNodes.push(nodes[iTargetJoint]);
          }
        }

        return rootNodes;
      }

      function getLocalBindPoses(skeleton) {
        var sourceJointsTransforms = Array.from({
          length: skeleton.joints.length
        }, function (_, index) {
          var parentJointIndex = getParentJoint(skeleton, index);
          var bindPose = skeleton.inverseBindposes[index];
          var localBindPose = new math.Mat4();

          if (parentJointIndex < 0) {
            math.Mat4.copy(localBindPose, bindPose);
          } else {
            math.Mat4.multiply(localBindPose, skeleton.bindposes[parentJointIndex], bindPose);
          }

          return localBindPose;
        });
        return sourceJointsTransforms;
      }

      function getParentJoint(skeleton, jointIndex) {
        var jointPath = skeleton.joints[jointIndex];
        var segments = jointPath.split('/');
        var parentJointPath = segments.length === 1 ? '' : segments.slice(0, segments.length - 1).join('/');
        var parentJointIndex = !parentJointPath ? -1 : skeleton.joints.indexOf(parentJointPath);
        return parentJointIndex;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OctahedralBone.ts", ['cc', './GeometryUtils.ts'], function (exports) {
  'use strict';

  var cclegacy, Vec3, Quat, Mat4, gfx, calculateNormals;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Mat4 = module.Mat4;
      gfx = module.gfx;
    }, function (module) {
      calculateNormals = module.calculateNormals;
    }],
    execute: function () {
      exports('createOctahedralBone', createOctahedralBone);

      cclegacy._RF.push({}, "f9b9dUPAYBNMo/j5reSMvUI", "OctahedralBone", undefined);
      /**
       * Create an octahedral geometry which usually represents a bone.
       * The octahedral is constituted of two rectangular pyramids, both share the same polygonal base.
       * The height of the octahedral is 1.0.
       * @returns The geometry.
       */


      function createOctahedralBone(_ref) {
        var location = _ref.location,
            width = _ref.width,
            length = _ref.length,
            _ref$ratio = _ref.ratio,
            ratio = _ref$ratio === void 0 ? 0.2 : _ref$ratio;
        var halfWeight = width / 2.0;
        var halfLength = length / 2.0;
        var positions = [0.0, 0.0, 0.0, // lowerApex
        0.0, 1.0, 0.0, // upperApex
        halfWeight, ratio, halfLength, // v0
        -halfWeight, ratio, halfLength, // v1
        -halfWeight, ratio, -halfLength, // v2
        halfWeight, ratio, -halfLength // v3
        ];

        if (location) {
          var dir = Vec3.subtract(new Vec3(), location.upper, location.lower);
          var dirLen = Vec3.len(dir);
          Vec3.normalize(dir, dir);
          var rot = Quat.rotationTo(new Quat(), Vec3.UNIT_Y, dir);
          var transform = Mat4.fromRTS(new Mat4(), rot, location.lower, new Vec3(dirLen, dirLen, dirLen));

          for (var i = 0; i < positions.length / 3; ++i) {
            var p = Vec3.fromArray(new Vec3(), positions, 3 * i);
            Vec3.transformMat4(p, p, transform);
            Vec3.toArray(positions, p, 3 * i);
          }
        }

        var lowerApex = 0;
        var upperApex = 1;
        var v0 = 2;
        var v1 = 3;
        var v2 = 4;
        var v3 = 5;
        var faceVertices = [v0, v1, lowerApex, v1, v2, lowerApex, v2, v3, lowerApex, v3, v0, lowerApex, upperApex, v1, v0, upperApex, v2, v1, upperApex, v3, v2, upperApex, v0, v3];
        var nFaceVertices = faceVertices.length;
        var vertices = new Array(3 * nFaceVertices).fill(0.0);

        for (var iFaceVertex = 0; iFaceVertex < nFaceVertices; ++iFaceVertex) {
          var positionIndex = faceVertices[iFaceVertex];
          vertices[3 * iFaceVertex] = positions[3 * positionIndex];
          vertices[3 * iFaceVertex + 1] = positions[3 * positionIndex + 1];
          vertices[3 * iFaceVertex + 2] = positions[3 * positionIndex + 2];
        }

        var normals = calculateNormals(vertices, Array.from({
          length: nFaceVertices
        }, function (_, i) {
          return i;
        }), new Array(vertices.length).fill(0.0));
        return {
          primitiveMode: gfx.PrimitiveMode.TRIANGLE_LIST,
          positions: vertices,
          normals: normals
        };
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Constants.ts', './SoftSkin.ts', './GeometryUtils.ts', './OctahedralBone.ts', './SkeletonUtils.ts', './SkeletonRenderer.ts', './FirstPersonCamera.ts', './Joystick.ts', './NodeUtils.ts', './MmoController.ts', './MixamoAnimationRetargeting.ts', './ThirdPersonCamera.ts', './UIContentSizeOutline.ts', './BillboardUi.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map