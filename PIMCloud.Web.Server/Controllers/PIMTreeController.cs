using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PIMCloud.Web.Server.Services.PIMTreeService;

namespace PIMCloud.Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PIMTreeController : ControllerBase
    {
        private readonly IPIMTreeService _PIMTreeService;

        public PIMTreeController(IPIMTreeService services)
        {
            _PIMTreeService = services;
        }

        [HttpGet("getpimtreeview")]
        public async Task<IActionResult> GetpimTreeView()
        {
            try
            {
                var dataRet = _PIMTreeService.GetPIMTreeView();
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("gettreeviewnode")]
        public async Task<IActionResult> GetTreeViewNode()
        {
            try
            {
                var dataRet = _PIMTreeService.GetTreeViewNodeList();
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("GetTreeViewByNodeId")]
        public async Task<IActionResult> GetTreeViewByNodeId([FromQuery] int nodeId)
        {
            try
            {
                var dataRet = _PIMTreeService.GetTreeViewByNodeId(nodeId);
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetValueFromObjectData")]
        public async Task<IActionResult> GetValueFromObjectData([FromQuery] int objId, int refId)
        {
            try
            {
                var dataRet = _PIMTreeService.GetValueFromObjectData(objId, refId);
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("GetObjectById")]
        public async Task<IActionResult> GetObjectById([FromQuery] int objId)
        {
            try
            {
                var dataRet = _PIMTreeService.GetObjectById(objId);
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("GetObjectDetailsByObjId")]
        public async Task<IActionResult> GetObjectDetailsByObjId([FromQuery] int objId)
        {
            try
            {
                var dataRet = _PIMTreeService.GetObjectDetailsByObjId(objId);
                var resultRes = JsonConvert.SerializeObject(dataRet);
                return Ok(resultRes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
